export async function loadHeaderFooter(){
    const header = await loadTemplate('../partials/header/main-header.html');
    const membership = await loadTemplate('../partials/header/membership-div.html');
    const footer = await loadTemplate('../partials/footer/main-footer.html');
    const headerElement = document.getElementById('main-header');
    const membershipElement = document.getElementById('membership');
    const footerElement = document.getElementById('main-footer');
    renderWithTemplate(header, headerElement);
    renderWithTemplate(membership, membershipElement)
    renderWithTemplate(footer, footerElement);
}
export async function loadTemplate(path){
    const html = await fetch(path).then(convertToText);
    const template = document.createElement('template');
    template.innerHTML = html;
    return template;
}
function convertToText(res) {
    if (res.ok) {
        return res.text();
    } else{
        throw new Error('Bad Response');
    }
}
export async function renderWithTemplate(template, parent, data, callback){
    let clone = template.content.cloneNode(true);
    if(callback) {
        clone = callback(clone, data);
    }
    parent.appendChild(clone);
}