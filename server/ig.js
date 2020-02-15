const { IgApiClient, IgCheckpointError  } = require('instagram-private-api');
const { sample } = require('lodash');
const Bluebird = require('bluebird');
const inquirer = require('inquirer');

const ig = new IgApiClient();

exports.sendIgMsgForNewAppointment = async (username, url) => {
    const ig = new IgApiClient();
    ig.state.generateDevice('dytdunkoc');
    // ig.state.proxyUrl = process.env.IG_PROXY;

    await Bluebird.try(async () => {
        await ig.simulate.preLoginFlow();
        const auth = await ig.account.login('dytdunkoc', process.env.EMAIL_PASS);
        // console.log(auth);

        setTimeout(async () => {
            // const [thread] = await ig.feed.directInbox().records();
        
            // console.log(thread)
            // console.log(thread.items)

            // ig.thread.items.forEach(message => {
            //     console.log(`${message._params.text} from ${message._params.userId}`);
            // });

            const id = await ig.user.getIdByUsername('btasdoven');
            console.log(id)
            // // const info = await ig.user.info(id);
            // // console.log(info)

            // // //thread.broadcastText('selam')
            // const options = {
            //     form: {
            //         text: `Merhaba ${username}, diyetkoçum.net linkine tıklayarak yeni gelen randevu istegini kabul edebilirsin.`
            //     },
            //     item: "link",
            //     userIds: id,
            // }
            // console.log(options);
            const options = {
                item: 'link',
                form: {
                    link_text: `Yeni randevu istegi -- kabul etmek için diyetkocum.net`,
                    link_urls: JSON.stringify([url]),
                },
                userIds: id,
            }
            const th = ig.directThread.broadcast(options)
            console.log(th)
        }, 2500);
    }).catch(IgCheckpointError, async () => {
        console.log(ig.state.checkpoint); // Checkpoint info here
        await ig.challenge.auto(true); // Requesting sms-code or click "It was me" button
        console.log(ig.state.checkpoint); // Challenge info here
        const { code } = await inquirer.prompt([
        {
            type: 'input',
            name: 'code',
            message: 'Enter code',
        },
        ]);
        console.log(await ig.challenge.sendSecurityCode(code));
    }).catch(e => console.log('Could not resolve checkpoint:', e, e.stack));
};

exports.feed = async () => {

    await exports.login();

    console.log('logged in')
    // await ig.simulate.preLoginFlow();
    // const loggedInUser = await ig.account.login('dytdunkoc', 'd1y3tk0cum');
    // process.nextTick(async () => await ig.simulate.postLoginFlow());
    console.log('oh')
    // setTimeout(async () => {
    //     const [thread] = await ig.feed.directInbox().records();
    
    //     console.log(thread)
    // }, 5000);

    // You must generate device id's before login.
    // Id's generated based on seed
    // So if you pass the same value as first argument - the same id's are generated every time
//     ig.state.generateDevice('dytdunkoc');

//   // Execute all requests prior to authorization in the real Android application
//   // Not required but recommended
//   await ig.simulate.preLoginFlow();
//   const loggedInUser = await ig.account.login('dytdunkoc', 'd1y3tk0cum');
//   // The same as preLoginFlow()
//   // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
//   process.nextTick(async () => await ig.simulate.postLoginFlow());
//   // Create UserFeed instance to get loggedInUser's posts
//   const userFeed = ig.feed.user(loggedInUser.pk);
//   console.log(userFeed);

//   const myPostsFirstPage = await userFeed.items();
//   console.log(myPostsSecondPage);

//   // All the feeds are auto-paginated, so you just need to call .items() sequentially to get next page
//   const myPostsSecondPage = await userFeed.items();

//   console.log(myPostsSecondPage);
//   await ig.media.like({
//     // Like our first post from first page or first post from second page randomly
//     mediaId: sample([myPostsFirstPage[0].id, myPostsSecondPage[0].id]),
//     moduleInfo: {
//       module_name: 'profile',
//       user_id: loggedInUser.pk,
//       username: loggedInUser.username,
//     },
//     d: sample([0, 1]),
//   });
};