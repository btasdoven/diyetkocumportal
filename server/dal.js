const storage = require('node-persist');

const rows = {
    5: {
      envanter: {
        'btasdoven': {
          isClaimed: false,
          comments: [
            {
              text: "I hate Batuhan, he is ugly, unprofessional and he has a beautiful wife, I so envy him.",
              like: 12,
              dislike: 1,
            },
            {
              text: "Batuhan is my secret love <3 <3 <3333, Batuu, my loveee, reply me backkk!!!",
              like: 3,
              dislike: 0,
            }
          ]
        },
      }
    }
};
 

async function start() {
    await storage.init({ dir: 'stg', logging: true });

    if (process.env.PORT == undefined) {
      await storage.clear();
      await storage.setItem('5', rows[5]);
    }

    rows[5] = await storage.getItem('5');
}

start();

exports.getLikes = function (userId, kim, kimi) {
  console.log('getLikes');
  console.log(kim);
  console.log(kimi);
  
  var kim = rows[userId].likes[kim];

  if (!kim) {
    return { }
  }

  var kimi = kim[kimi]

  if (!kimi) {
    return {}
  }

  return kimi;
}

exports.putLikes = function (userId, kim, kimi, commentIdx, val) {
  console.log('putLikes');
  console.log(kim);
  console.log(kimi);
  console.log(commentIdx);
  console.log(val);

  oldVal = { liked: false, disliked: false };

  if (!rows[userId].likes) {
    rows[userId].likes = {
      [kim]: { [kimi] : {[commentIdx]: val}}
    }
  } else if (!rows[userId].likes[kim]) {
    rows[userId].likes[kim] = { 
      [kimi]: { 
        [commentIdx]: val 
      }
    };
  } else if (!rows[userId].likes[kim][kimi]) {
    rows[userId].likes[kim][kimi] = { 
      [commentIdx]: val
    };
  } else {
    oldVal = rows[userId].likes[kim][kimi][commentIdx];
    rows[userId].likes[kim][kimi][commentIdx] = val
  }

  likedChange = oldVal.liked 
  ? (val.liked ? 0 : -1)
  : (val.liked ? 1 : 0);
  dislikedChange = oldVal.disliked 
  ? (val.disliked ? 0 : -1)
  : (val.disliked ? 1 : 0);

  rows[userId].envanter[kimi].comments[commentIdx] = {
    ...rows[userId].envanter[kimi].comments[commentIdx],
    like: (rows[userId].envanter[kimi].comments[commentIdx].like || 0) + likedChange,
    dislike: (rows[userId].envanter[kimi].comments[commentIdx].dislike || 0) + dislikedChange,
  }

  console.log(rows[userId].envanter[kimi].comments[commentIdx]);

  storage.setItem(userId, rows[userId]);
}

exports.putDiary = function (userId, date, val) {
  console.log('putDiary');
  console.log(date);

  rows[userId].diaries[date] = val;
  storage.setItem(userId, rows[userId]);
}

exports.getDiary = function (userId, date) {
  console.log('getDiary');
  console.log(date);

  var ret = rows[userId].diaries[date];

  return ret == undefined ? { entries: [] } : ret;
}


exports.putEnvanter = function (userId, user, val) {
  console.log('putEnvanter');
  console.log(val);
  rows[userId].envanter[user] = val;
  storage.setItem(userId, rows[userId]);
}

exports.getEnvanter = function (userId, user) {
  console.log('getEnvanter');
  console.log(user)

  var ret = rows[userId].envanter[user];

  return ret == undefined ? { comments: [] } : ret;
}

exports.getMaterials =  function (userId, materialId) {
  console.log('getMaterials');
  console.log(materialId);
  
  if (materialId == undefined) {
    return rows[userId].materialHeaders;
  }

  return { [materialId] : rows[userId].materials[materialId] };
}

exports.setMaterialPart = function (userId, materialId, partId, values) {
    console.log('setMaterial');
    rows[userId].materials[materialId].data[partId].value = values.value;

    storage.setItem(userId, rows[userId]);
    //console.log(rows[userId].materials[materialId]);
}

exports.getAllFieldList = function(id) {
  console.log('getAllFieldList');
  return rows[id].allFieldList;
}

exports.getGroups =  function (id, groupId) {
  console.log('getGroups');
  console.log(groupId); 
  
  if (groupId == undefined) {
    console.log("group id undefined")
    return rows[id].groups;
  }

  return { [groupId] : rows[id].groups[groupId] };
}

exports.getFields =  function (id, fieldId) {
    console.log('getFields');
    console.log(rows[id].fields);
    return rows[id].fields[fieldId];
}

exports.getLink =  function (id, linkId) {
    console.log('getLink');
    if (!row[id].fields[linkId].shareLink) {
      console.log("incorrect link request " + id + " " + linkId)
    }
    
    return rows[id].fields[linkId];
}

exports.setFields = function (id, fieldId, value) {
    console.log('setFields');
    rows[id].fields[fieldId] = value;
    rows[id].allFieldList[fieldId] = true;
    // var fieldData = rows[id].fields[fieldId].data;

    // Object.keys(fieldData).forEach((fieldId) => {
    //   if (fieldData[fieldId].type == 'link') {
    //     var refFieldId = fieldData[fieldId].link;
    //     var refGroup = refFieldId.split('/')[0];
    //     fieldData[fieldId].value = rows[id].fields[refGroup].data[refFieldId].value;
    //   }
    // });

    storage.setItem(id, rows[id]);
    console.log(rows[id].fields[fieldId]);
}
  