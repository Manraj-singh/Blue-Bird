 let clikes =[] ,cloves=[],csads=[],cangrys=[],cwows=[];
            post.comments.forEach(like => {
                switch (like.reaction) {
                    case 'Like':
                        likes.push(like.user)
                        break;
                    case 'Love':
                        loves.push(like.user)
                        break;

                    case 'Sad':
                        sads.push(like.user)
                        break;
                    case 'Angry':
                        angrys.push(like.user)
                        break;
                    case 'Wow':
                        wows.push(like.user)
                        break;
                    
                    default:
                        break;
                }
            })

            post.emojiData={
                post_id : post._id,
                like : likes,
                love:loves,
                sad : sads,
                angry : angrys,
                wow: wows
            }

            post.save()