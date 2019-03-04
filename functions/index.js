const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

const whitelist = new Set(['andrew.s.saad@gmail.com', 'aaporter@ucsd.edu','a5le@ucsd.edu','apsylves@ucsd.edu ','awma@ucsd.edu','arg061@ucsd.edu','cnietogr@ucsd.edu','dharnant@ucsd.edu','duy003@ucsd.edu','eziaeika@ucsd.edu','eugalde@ucsd.edu','elb003@ucsd.edu','gmaki@ucsd.edu','hmeid@ucsd.edu','hjw005@ucsd.edu','jcm047@ucsd.edu','j1hsieh@ucsd.edu','Jedara@ucsd.edu','ket037@ucsd.edu','ksoloway@ucsd.edu','kvlorenz@ucsd.edu','mibryant@ucsd.edu','mrubenac@ucsd.edu','nburdick@ucsd.edu','Njl002@ucsd.edu','nkibria@ucsd.edu ','pamidon@ucsd.edu','ptcheng@ucsd.edu','rag031@ucsd.edu','regreer@ucsd.edu','rul124@ucsd.edu','samondal@eng.ucsd.edu','shuen@ucsd.edu','t1jain@ucsd.edu','w1huang@ucsd.edu','wac022@ucsd.edu','Xis142@ucsd.edu','yel106@ucsd.edu','zbabbitt@ucsd.edu','zhp012@ucsd.edu','zhz402@ucsd.edu','Mac216@eng.ucsd.edu','frushton@ucsd.edu','ivivchar@ucsd.edu','nlpathak@eng.ucsd.edu','abhanage@eng.ucsd.edu','ang121@ucsd.edu','biz003@ucsd.edu','gvalliap@ucsd.edu','j8jia@ucsd.edu','kmlui@ucsd.edu','l1lang@ucsd.edu','rux019@ucsd.edu','shh176@ucsd.edu','ayessenb@ucsd.edu','chw357@ucsd.edu','namishra@ucsd.edu','nqn013@ucsd.edu','VMiranda@ucsd.edu','wim003@ucsd.edu','yiy116@ucsd.edu','ehlin@ucsd.edu','juc159@ucsd.edu','mep011@ucsd.edu','smt021@ucsd.edu','sic143@ucsd.edu','zsrostli@eng.ucsd.edu','jil026@ucsd.edu','lfriley@ucsd.edu','ayonamin@ucsd.edu','all123@ucsd.edu','ajshahin@ucsd.edu','aliou@ucsd.edu','abyoo@ucsd.edu','ant047@ucsd.edu','arsehgal@ucsd.edu','b7du@ucsd.edu','bbl003@ucsd.edu','brc019@ucsd.edu','cacunnin@ucsd.edu','ebperez@ucsd.edu','graskovi@ucsd.edu','gmakmur@ucsd.edu','Hfaulsti@ucsd.edu','han015@ucsd.edu','jchazen@ucsd.edu','jls016@ucsd.edu','jabao@ucsd.edu','jis126@ucsd.edu','jir017@ucsd.edu','jos047@ucsd.edu','kaw063@ucsd.edu','krungta@ucsd.edu','liz147@ucsd.edu','mhrice@ucsd.edu','mboulgak@ucsd.edu','miz082@ucsd.edu','mil209@ucsd.edu','mmgo@ucsd.edu','nkbansal@ucsd.edu','opandiya@ucsd.edu','t2zaw@ucsd.edu','t1pan@ucsd.edu','w6mao@ucsd.edu','yhc001@ucsd.edu','zkdeng@ucsd.edu','yih159@ucsd.edu','Yix176@ucsd.edu ','clohrli@ucsd.edu','jtt049@ucsd.edu','h7cai@ucsd.edu','jkadifa@ucsd.edu','Phhayes@eng.ucsd.edu','tworley@ucsd.edu','gchau@ucsd.edu','klevick@ucsd.edu','roxi@ucsd.edu','a3mathur@ucsd.edu','ssrey@ucsd.edu','clt020@ucsd.edu','esp009@ucsd.edu','ddurubeh@ucsd.edu','bmhenriq@ucsd.edu','tnl015@ucsd.edu','dpazruiz@ucsd.edu','m9yu@ucsd.edu','jur009@ucsd.edu','m1sathe@ucsd.edu','wej014@ucsd.edu','jhy015@ucsd.edu','aknopes@ucsd.edu','dlakshmi@ucsd.edu','smliu@ucsd.edu','jot035@ucsd.edu','nwahal@ucsd.edu','aagraham@ucsd.edu','atp022@ucsd.edu','c2gong@ucsd.edu','Dgriley@ucsd.edu','dorozco@ucsd.edu','ecfisher@ucsd.edu','h8hu@ucsd.edu','j1burke@ucsd.edu','xiz170@ucsd.edu','mranis@ucsd.edu','ssunarjo@ucsd.edu','shj003@ucsd.edu','s3wan@ucsd.edu','wnliang@ucsd.edu','adcoffma@ucsd.edu','amchung@ucsd.edu','aqu@ucsd.edu','akannan@ucsd.edu','bsenne@ucsd.edu','ckoguchi@ucsd.edu','cal027@ucsd.edu','jnn004@ucsd.edu','jnajjar@ucsd.edu','k1newcom@ucsd.edu','kqt004@ucsd.edu','llubrico@ucsd.edu','meyazdan@ucsd.edu','mar076@ucsd.edu','n1jenkin@ucsd.edu','T5allen@ucsd.edu','vpukasam@ucsd.edu','vbarbosa@ucsd.edu','pcyoon@ucsd.edu','z3meng@ucsd.edu','TJDawkins@ucsd.edu','ais003@ucsd.edu','awc002@ucsd.edu','aty@ucsd.edu','bandika@ucsd.edu','celogan@ucsd.edu','cgalac@ucsd.edu','ctarangi@ucsd.edu','c3luong@ucsd.edu','deli@ucsd.edu','dsalinas@ucsd.edu','elhe@ucsd.edu','jaime@ucsd.edu','ggesirie@ucsd.edu ','jtroyer@ucsd.edu','jgkam@ucsd.edu','k4thai@ucsd.edu','kvn016@ucsd.edu','kspotkae@ucsd.edu','lhl006@ucsd.edu','lapage@ucsd.edu','ltindall@ucsd.edu','munanian@ucsd.edu','mralam@ucsd.edu','ntli@ucsd.edu','qiw033@ucsd.edu ','rpatron@ucsd.edu','s8guo@ucsd.edu','sohamj09@gmail.com','tctsai@ucsd.edu','wesheng@ucsd.edu','z4zeng@ucsd.edu','bsearle@ucsd.edu','deshen@ucsd.edu','jslaton@ucsd.edu','mcc007@ucsd.edu','oguerrer@ucsd.edu','pnorris@ucsd.edu','tcn006@ucsd.edu','vhyu@eng.ucsd.edu','x5tong@ucsd.edu','pbarrina@ucsd.edu','kbarronk@ucsd.edu','scornett@ucsd.edu','d1dong@ucsd.edu','dcduncan@ucsd.edu','myhe@ucsd.edu','bhedayat@ucsd.edu','a4kaur@ucsd.edu','w1kwan@ucsd.edu','dnl001@ucsd.edu','jleblanc@ucsd.edu','chl218@ucsd.edu','jom027@ucsd.edu','nmillias@ucsd.edu','sphu@ucsd.edu','t5thai@ucsd.edu','mhvasque@ucsd.edu','jwada@ucsd.edu','ssw021@ucsd.edu','a8xu@ucsd.edu','anc041@ucsd.edu','rcericks@ucsd.edu','mgooch@ucsd.edu','i3liu@ucsd.edu','hmangalo@ucsd.edu','ksomers@ucsd.edu','rcwhalen@ucsd.edu','kwilkers@ucsd.edu','tpdell@ucsd.edu','ktgustaf@ucsd.edu','alhe@ucsd.edu','kvn007@ucsd.edu','heqin@ucsd.edu','dasmith@ucsd.edu','akso@ucsd.edu','wavillan@ucsd.edu','d6lau@ucsd.edu','jsyoung@ucsd.edu','wiguo@ucsd.edu','j5chan@ucsd.edu','fychang@ucsd.edu','whcheuk@ucsd.edu','bellis@ucsd.edu','dyl010@ucsd.edu','ktnagata@ucsd.edu','crebert@ucsd.edu','mfsilva@ucsd.edu','isimpelo@ucsd.edu','atengamn@ucsd.edu','jenswang@ucsd.edu','hphuong@ucsd.edu','nfarahba@ucsd.edu','khhuynh@ucsd.edu','tkuwayam@ucsd.edu','ayliang@ucsd.edu','jmalihan@ucsd.edu','gyamasak@ucsd.edu','ccalkins@ucsd.edu','d7chang@ucsd.edu','sechen@ucsd.edu','rjc002@ucsd.edu','jsc009@ucsd.edu','acorelli@ucsd.edu','lihu@ucsd.edu','jjhuang@ucsd.edu','mnekraso@ucsd.edu','sockleg@ucsd.edu','aalaviza@ucsd.edu','vbhalodi@ucsd.edu','mbrigant@ucsd.edu','lgilpin@ucsd.edu','dgovea@ucsd.edu','jdli@ucsd.edu','t6martin@ucsd.edu','jan009@ucsd.edu','sshelech@ucsd.edu','jxtan@ucsd.edu','rclaus@ucsd.edu','rhfang@ucsd.edu','jrl001@ucsd.edu','jtl005@ucsd.edu','x1lu@ucsd.edu','ryatchak@ucsd.edu','lbai@ucsd.edu','yec002@ucsd.edu','bwjones@ucsd.edu','bjungman@ucsd.edu','jcshih@ucsd.edu','jzhao@ucsd.edu','sylui@ucsd.edu','knip@ucsd.edu','bstieber@ucsd.edu','tasu@ucsd.edu','dsugimur@ucsd.edu','t2truong@ucsd.edu','dagsalon@ucsd.edu','Sjfernan@ucsd.edu','jwlien@ucsd.edu','pling@ucsd.edu','stn001@ucsd.edu','bnhong@ucsd.edu','jhw003@ucsd.edu','lgreiner@ucsd.edu','baho@ucsd.edu','cyhung@ucsd.edu','yujiang@ucsd.edu','jklau@ucsd.edu','dleu@ucsd.edu','rmanzano@ucsd.edu','jmounzer@ucsd.edu','gprior@ucsd.edu','cwrudy@ucsd.edu','akshieh@ucsd.edu','tstahlbu@ucsd.edu','mtotten@ucsd.edu','exu@ucsd.edu','rying@ucsd.edu','qkennett@ucsd.edu','sjl006@ucsd.edu','cnoble@ucsd.edu']);

exports.onCreateUser = functions.auth.user().onCreate((user) => {
    if (whitelist.has(user.email)) {
        console.log('Setting member privilege')
        return admin.auth().setCustomUserClaims(user.uid, {member: true})
            .then(() => {
                return db.collection('users').doc(user.uid).set({email : user.email})
            })
            .catch(error => {
                console.log(error)
            })
    } else {
        console.log('Deleting an user based on the whitelist')
        return admin.auth().deleteUser(user.uid)  
            .catch(error => {
                console.log(error)
            })   
    }
});

exports.onDeleteUser = functions.auth.user().onDelete((user) => {
    return db.collection('users').doc(user.uid).delete()
        .then(() => {
            console.log("Successfully removed user's data.");
        })
        .catch(error => {
            console.log(error);
        })
});