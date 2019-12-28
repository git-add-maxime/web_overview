var request = new XMLHttpRequest()
request.open('GET', 'http://163.172.176.138:2834/statme/api/v1/message/guild/507389389098188820/', true)
document.addEventListener('DOMContentLoaded', ()=>{
    request.onload = function() {
        if(request.status >= 200 && request.status < 400){
            const messages = JSON.parse(this.response)
            const info = document.getElementById('info')
            info.innerHTML = `
                <header>
                    <h2> Activity by <a href="http://163.172.176.138:2834/statme/"> Statme </a> </h2>
                </header>
                <main>
                    Message count : ${messages.length}
                </main>
                <footer>

                </footer>
            `
        }else{
            console.error('error', request.status)
        }
    }
    request.send()
})