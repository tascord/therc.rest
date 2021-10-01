const CopyElement = document.createElement('textarea');
document.body.appendChild(CopyElement);

CopyElement.style.opacity = '0';
CopyElement.style.position = 'absolute';
CopyElement.style.zIndex = '-1';

let Clicked = [];

// Register buttons
for (const button of [...document.querySelectorAll('button[copy]')]) {
    button.addEventListener('click', () => {
        
        if(Clicked.indexOf(button) !== -1) return;
        Clicked.push(button);

        CopyElement.innerText = button.getAttribute('copy');
        CopyElement.select();
        document.execCommand('copy');

        let html = button.innerHTML;
        button.innerText = 'Copied!';

        setTimeout(() => {
            Clicked = Clicked.filter(c => c !== button);
            button.innerHTML = html;
        }, 750)

    })
}