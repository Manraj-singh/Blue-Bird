
//for toggling display none of comments section
function handleClick(tag) {

    let id = tag.id.split('-')[2]
    const did = document.getElementById('post-comment-' + id)
    console.log('cliecked', did);
    if (did.style.display == 'none') {
        did.style.display = 'inherit'
    } else {
        did.style.display = 'none'
    }
}