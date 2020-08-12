const main = () => {

    const getPlayer = (keyword) => {
        fetch(`https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${keyword}`)
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            renderAllPlayers(responseJson.player);
        })
        .catch(error => {
            showResponseMessage(`${keyword} is not found`);
        })
    };

    const addPlayer = (idKey) => {
        fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=${idKey}`)
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            renderPlayersDraft(responseJson.players);
        })
        .catch(error => {
            showResponseMessage(`${idKey} tidak ditemukan`);
        })
    };

    const renderAllPlayers = (players) => {
        const listPlayerElement = document.querySelector("#player-list");
        listPlayerElement.innerHTML = "";

        players.forEach(player => {
            listPlayerElement.innerHTML += `
            <div class="player-item">
                <div class="image-container">
                    <img src="${player.strThumb}" alt="Player photo">
                </div>
                <div class="player-info">
                    <h2>${player.strPlayer}</h2>
                    <p>${player.strPosition}</p>
                </div>
                <div class="btn-wrapper">
                    <button class="btn" id="${player.idPlayer}" type="button">+ Add</button>
                </div>
            </div>
        `;
        });
        const buttons = document.querySelectorAll(".btn");
        buttons.forEach(button => {
            button.addEventListener("click", event => {
                const playerId = event.target.id;
                addPlayer(playerId);
            })
        })
    };
    
    let formArray = [];

    const init = () => {
        document.getElementById('my-player').innerHTML = "";
        if(localStorage.formPlayer) {
            formArray = JSON.parse(localStorage.formPlayer);
            
            for(let i=0;i<formArray.length;i++){
                if(formArray.length > 11){
                    showResponseMessage(`Daftar Pemain sudah lengkap`)
                    break;
                } else {
                    updateTableCell(i,formArray[i].name,formArray[i].position)
                }
            }
                const saveButton = document.querySelector("#saveButton");
        
                saveButton.addEventListener("click", function () {
                    if(formArray.length<11){
                        showResponseMessage(`Pemain belum lengkap, Anda baru menginput ${formArray.length} pemain.`)
                    } else if(formArray.length === 11){
                        showResponseMessage(`Selamat, 11 daftar pemain impianmu telah disimpan`)
                    }
                });
        }
    };

    const renderPlayersDraft = (drafts) => {
        drafts.forEach((draft) => {
            const namePlayer = draft.strPlayer;
            const positionPlayer = draft.strPosition;

            const draftPlayer = {name:namePlayer,position:positionPlayer};
            formArray.push(draftPlayer);

            localStorage.formPlayer = JSON.stringify(formArray);
            init();
        });
    };

    const updateTableCell = (index,namePlayer,positionPlayer) => {
        const table = document.getElementById('my-player');
        const row = table.insertRow();
        const nameCell = row.insertCell(0);
        const posCell = row.insertCell(1);
        const dltCell = row.insertCell(2);

        nameCell.innerHTML = namePlayer;
        posCell.innerHTML = positionPlayer;
        dltCell.innerHTML = `<button type="button" class="btnDel" id="${index}">X</button>`;

        const butts = document.querySelectorAll(".btnDel");
        butts.forEach(butt => {
            butt.addEventListener("click", event => {
                let playerIndex = event.target.id;
                //console.log(playerIndex);
                deletePlayer(playerIndex);
            })
        })
    };

    const deletePlayer = (index) => {
        const table = document.getElementById('my-player');
        const conv  = parseInt(index);
        //console.log(`index = ${conv}`);
        table.deleteRow(conv);
        formArray.splice(index, 1,);
        localStorage.formPlayer = JSON.stringify(formArray);
        init();
    };

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };


    const inputPlayerKeyword = document.querySelector("#searchElement");
    const searchButton = document.querySelector("#searchButton");
    
    searchButton.addEventListener("click", function () {
        const key = inputPlayerKeyword.value;
        getPlayer(key);
    });

    document.addEventListener("DOMContentLoaded", init);
}

export default main;