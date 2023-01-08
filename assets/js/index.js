// const toggleComments = document.querySelector('.toggle-comments')
// const commentList = document.querySelector('.post-comments-list');
// toggleComments.addEventListener('click',function(){
//     console.log('clicked',commentList);
//     if(commentList.style.display=='none'){
//         commentList.style.display='inherit'
//     }else{
//         commentList.style.display='none'
//     }
// });

function handleClick(tag){

    let id = tag.id.split('-')[2]
    const did = document.getElementById('post-comment-'+id)
    console.log('cliecked',did);
    if(did.style.display=='none'){
                did.style.display='inherit'
            }else{
                did.style.display='none'
            }
}