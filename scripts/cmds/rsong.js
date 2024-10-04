const axios = require("axios");



module.exports = {


  config: {


    name: 'rsong',


    version: '1.0.69',


    author: 'Siam the frog>🐸',


    countDown: 20,


    role: 0,


    category: 'media',


    shortDescription: 'random song', 


    longDescription: 'Get random hindi+English+Vojpury song',


    guide: {


      en: '{pn} ',


    },


  },


  


  sentVideos: [],



  onStart: async function ({ api, event, message }) {


    const senderID = event.senderID;({


    });



    const name = [


      "Metamorphosis",


      "dhariya",


      "Safari",


      "subodh",


      "paisa",


      "9.45 [Slowed+reverbs]",


      "Cj whoopty",


      "david guetta+ers remix",


      "Nainowale ne x sugar & brownies mashup",


      "Desi kalakaar [slowed & reverb]",


      "amplifier [Slowed+reverbed]",


      "We rollin [Slowed+reverb]",


      "No love [slowes+reverb]",


      "Rauf & faik childhood 2021",


      "into your arms english sad song",


      "mood",


      "Believer",


      "habibi slowed & reverb",


      "karam khudaya he romantic hindi song",


      "yaar na miley slowed & reverb",


      "New attitude stutus song",


      "jarico remix",


      "Laad piyake slowes & reverb",


      "chammak chalo [slowed ৳ reverb]",


      "hokaah bar [slowed+reverb]",


      "Hasi female cover [slowed+reverb]",


      "Saiyaara [slowed+reverb]",


      "Dilbar [Slowed+reverb]",


      "Tum hi ho [Slowed=reverb]",


      "Plain jane [slowed+reverb] Ak47",


      "phonk version espectro",


      "Character Dheela [slowed+reverb]",


      "Jhalak dikhlaja [slowed+reverb]",


      "Daddy Mummy [Slowed+reverb]",


      "isqam [slowed&reverb]",


      "kiya kiya [slowed+reverb]",


      "agar tum tum mil jao [slowed+reverb]",


      "one love [slowed+reverb]",


      "Thoda thoda pyarr [Slowed+reverb]",


      "Mujhse shaadi karogi [slowed+reverb]",


      "Dj gimi O X habibi [slowed+reverb]",


      "Dj snake Meganta riddim",



    ];


    


   


    const vhojpury = [


      "duk duk kore",


      "Mota jaiba ho [slowed & reverb]",


      "Malla vhojpury song",


      "tut jaye raja ji [slowed & reverb]",


      "badli badli lage sapna",


      "English medium Sapna Randi",


      "Abhi to party shuru hui hai",


      "Gajban pani ne challi",


      "Haye re meri moto [slowed & reverb]",


      "Dhai litter",


      "Kalua ke happy holly",


      


    ];  



    const link = [


      "https://drive.google.com/uc?export=download&id=1W2dbZny0xhZsZFtnuyjl46hsPuXamDQQ",


      "https://drive.google.com/uc?export=download&id=1TSg3t3r1hwym5rtr6pJsyAo6bcG2Giip",


      "https://drive.google.com/uc?export=download&id=1TU3WvmXNTiR9qESqOyZzJPD2oe-4MyWW",


      "https://drive.google.com/uc?export=download&id=1TmUaPgrTEJaa0eaTB7lHOvLRN3govwB3",


      "https://drive.google.com/uc?export=download&id=1TzSDmahV1bqQEgmvVUBfKXjvna9SP54H",


      "https://drive.google.com/uc?export=download&id=1U0YX5C9vYj578CRUt4Oq7y9UgGdo_q96",


      "https://drive.google.com/uc?export=download&id=1U5dHhukyMh5DGoFPwPknTlzp-bl2k6wW",


      "https://drive.google.com/uc?export=download&id=1U8rWTuqGt1K3CEo7uB6DQqsw7ndzsKQ6",


      "https://drive.google.com/uc?export=download&id=1UD7oaeMCG5DTREQCLaEqaGN39zpQdeh-",


      "https://drive.google.com/uc?export=download&id=1UH1su9O3rXHt_-WV7zOtvrq0MegljSQJ",


      "https://drive.google.com/uc?export=download&id=1UHNdS5X32v6XqAcsYCSu-hY4ApFSc7iX",


      "https://drive.google.com/uc?export=download&id=1UIyHjdFKKS2uzHCJyFy5ls1-gUSs32qK",


      "https://drive.google.com/uc?export=download&id=1ULguLurY5yFAPtlctD-y4VOxVzBZbJk_",


      "https://drive.google.com/uc?export=download&id=1UQCH2bR83fxIi30imXbyYyitjw6uayEI",


      "https://drive.google.com/uc?export=download&id=1UUUT1IH8bPk0D2KNrZ6XR8JfLJuyu54N",


      "https://drive.google.com/uc?export=download&id=1UYRrGNm5O6dol3hAnIEnUjBvj6BixIF5",


      "https://drive.google.com/uc?export=download&id=1U__oyksd06jAbygxcfxphK-kTYFdS7UQ",


      "https://drive.google.com/uc?export=download&id=1Uaf1sX7qo4im1EdbejpMmoCZR47I_O1g",


      "https://drive.google.com/uc?export=download&id=1UayfQu-93maNfpNVK8Ad5Iw-FR5eXpI1",


      "https://drive.google.com/uc?export=download&id=1UcyYPmeFVrykpB1JMpdpowClJBHk6OKS",


      "https://drive.google.com/uc?export=download&id=1Utx1qrFtm8JJ87w7VlCl35GRFRrzXu2L",


      "https://drive.google.com/uc?export=download&id=1V6YkWYBLiozlgJAhVC0WZGHmcU1_fVp2",


      "https://drive.google.com/uc?export=download&id=1Vo_vleDCnvRx8c00vZzccRv5VSCJT2VI",


      "https://drive.google.com/uc?export=download&id=1VuHvuDwV5l4dzIkRhcE0W8QF-Gm1RQP1",


      "https://drive.google.com/uc?export=download&id=1W0gwrj6vNscr3KKadoVSBLubeS4ZXjRr",


      "https://drive.google.com/uc?export=download&id=1W0px-IO4HA1qvirENrQLKiThsq6dOpCq",


      "https://drive.google.com/uc?export=download&id=1W1f17fSAwZw_DhbFWMW1rD1cBV0n87se",


      "https://drive.google.com/uc?export=download&id=1W21E_gLTmTiyHgxwMSgW5eK_fVVTiWkd",


      "https://drive.google.com/uc?export=download&id=1W99B6iXxzo96pFcTHUwOL4N9jPlgSb_-",


      "https://drive.google.com/uc?export=download&id=1WAVUcSnaDnmQ9tbwZHrePiHoK-md1gbz",


      "https://drive.google.com/uc?export=download&id=1WOmRfBPprwcIeP_4ugjYh8yCPq1oMMu3",


      "https://drive.google.com/uc?export=download&id=1WUnx6LTgWJWKJMaa2nWbC--6WbvKfj3y",


      "https://drive.google.com/uc?export=download&id=1WWdKIJZ58eqnvC_kOs5PBye5LLzMjdvg",


      "https://drive.google.com/uc?export=download&id=1WmzQ2R_A0DBRJMYDY3kE0AlJiA73S8rT",


      "https://drive.google.com/uc?export=download&id=1WouvqrdjLh_jnBVYE3DNVUw7TWNPF4Ln",


      "https://drive.google.com/uc?export=download&id=1X23IMEGN9LKmBvnJJNd0d9Nj46iUGiAV",


      "https://drive.google.com/uc?export=download&id=1X3uJWCQBobaxaNc_uLVDY-VqWJL4nJQf",


      "https://drive.google.com/uc?export=download&id=1XCqy-mLHWyoNJwD1RT4HfUxhmzymcNo9",


      "https://drive.google.com/uc?export=download&id=1XKdQgZhlUpWGA1SsrKvxrNm_HiuXgyF1",


      "https://drive.google.com/uc?export=download&id=1XLCi65V6St8deugFeqrgPlyqwdZupJZC",


      "https://drive.google.com/uc?export=download&id=1XWRJQBnVUpQkx1zSIoS27lZs5IA6kD4m",


      "https://drive.google.com/uc?export=download&id=1Xl6peFtvuKUlobtIVYWIktdHXfNMHB83",


      "https://drive.google.com/uc?export=download&id=1XlCM-1G421p_UaFgVkXDfn2RJJXBkFKB",


      "https://drive.google.com/uc?export=download&id=1XqytEj6duTTr5xsWCfSX0ktiolslfjVU",


      "https://drive.google.com/uc?export=download&id=1Xvyq2TnjsL5vPjiiefk8kwywZgiHz180",


      "https://drive.google.com/uc?export=download&id=1Xw0bUJqzAvFDblbAqCxG2kCdrsp2Ohvl",


      "https://drive.google.com/uc?export=download&id=1YPYGSs7EDqDCatZFvpRDTN5rOdrgXRyr",


      "https://drive.google.com/uc?export=download&id=1YL4pvLKd02Yw_ElK64VbIdUNWdd99ruA",


      "https://drive.google.com/uc?export=download&id=1YVq939id648YijWC1s2Oui2egone-Jaf",


      "https://drive.google.com/uc?export=download&id=1YcGIrOTXFkjU7UdboNsuQzZaw3N6q7DS", 


      "https://drive.google.com/uc?export=download&id=1Yi4r12j3GR7SnteAz56t-jj587wn7T4g",


      "",



    ];



    const availableVideos = link.filter(video => !this.sentVideos.includes(video));



    if (availableVideos.length === 0) {


      this.sentVideos = [];


    }



    const randomIndex = Math.floor(Math.random() * availableVideos.length);


    const randomVideo = availableVideos[randomIndex];



    this.sentVideos.push(randomVideo);


   


    {


      message.reaction("🐸", event.messageID);


      message.reply({


        body: "𝑯𝒆𝒓𝒆'𝒔 𝒚𝒐𝒖𝒓 𝑹𝒂𝒏𝒅𝒐𝒎 𝒔𝒐𝒏𝒈 🐸",


        attachment: await global.utils.getStreamFromURL(randomVideo),


      },


     );


    }


   },


 };
