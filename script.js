var request = new XMLHttpRequest()
request.open('GET', 'https://statme-api.tk/v1/message/guild/507389389098188820/', true)
document.addEventListener('DOMContentLoaded', ()=>{
    request.onload = function() {
        if(request.status >= 200 && request.status < 400){
            
            const messages = JSON.parse(this.response, (key, value) => {
                if(key.includes('timestamp'))
                return new Date(value).getTime()
                return value
            })
            
            let 
                channels = new Set(),
                members = new Set()

            messages.forEach(message => {
                channels.add(message.channel_id)
                members.add(message.user_id)
            })

            channels = Array.from(channels)
            members = Array.from(members)

            function messageByDay(member){

                const day = 1000*60*60*24

                const memberMessages = messages.filter(message => message.user_id === member)
                
                if(memberMessages.length < 2) return 0

                const start = memberMessages.sort((a,b) => a.created_timestamp - b.created_timestamp)[0].created_timestamp
                const end = memberMessages.sort((a,b) => b.created_timestamp - a.created_timestamp)[0].created_timestamp
                const time = end - start

                const result = Math.round( memberMessages.length / (time / day) )

                return result

            }
            
            const info = document.getElementById('info')
            info.innerHTML = `
                <header>
                    <h2> Activity by <a href="https://statme-api.tk/statme/"> Statme </a> </h2>
                </header>
                <main>
                    <h3> Message count : ${messages.length} </h3>
                    <h3> Active channels : ${channels.length} </h3>
                    <h3> Active members : ${members.length} </h3>
                    <h4> TOP 10 ACTIVITY </h4>
                    <ol>
                        ${members
                            .sort((a,b) => messageByDay(b) - messageByDay(a))
                            .slice(0,10)
                            .map(member => `<li><span class="disk"> ${messageByDay(member)} </span> ${member} <span class="disk"> ${messages.filter(message => message.user_id === member).length} </span></li>`)
                            .join('')
                        }
                    </ol>
                </main>
                <footer>
                    <span> FOOTER </span>
                </footer>
            `
        }else{
            console.error('error', request.status)
        }
    }
    request.send()
})

function map(value, min, max, targetMin, targetMax) {
    return targetMin + (targetMax - targetMin) * ((value - min) / (max - min));
}