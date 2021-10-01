if (typeof GuildID === 'undefined') throw new Error("No GuildID defined");

fetch(`https://discord.com/api/guilds/${GuildID}/widget.json`)
    .then((response) => {

        let style = document.createElement('link');
        document.head.appendChild(style);

        style.rel = 'stylesheet';
        style.href = 'widget/style.css';

        if (!response.ok) throw new Error("Unable to reach Discord.");
        response.json()
            .then((data) => {

                for (const widget of [...document.getElementsByTagName('discord')]) {

                    const discord_logo = document.createElement('img');
                    const server_title = document.createElement('h2');
                    const server_count = document.createElement('span');
                    const members_icon = document.createElement('img');

                    widget.appendChild(discord_logo);
                    widget.appendChild(server_title);
                    widget.appendChild(server_count);

                    server_title.innerText = data.name;
                    server_count.innerText = data.members.length;
                    
                    server_count.prepend(members_icon);

                    members_icon.src = 'widget/user.svg';
                    discord_logo.src = 'widget/widget_logo.svg';

                    widget.addEventListener('click', () => {
                        window.open(data.instant_invite, `Join ${data.name}!`, 'menubar=no,resizable=no,scrollbars=no,status=no,location=no,height=600,width=500')
                    })

                }
            })
    })