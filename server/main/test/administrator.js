const tap = require('tap')
const request = require('request')

const host='http://localhost:3000'

tap.test('administrator',function(t){
  const count=40
  let users=[]
  Promise.all([
    new Promise(function(resolve){
      let index=count
      for(let i=0;i<count;i++) {
        let username=Math.random().toString();
        users.push(username)
        request({
          method:'POST',
          uri:host+'/administrator/create',
          json:true,
          'content-type':'application/json',
          body:{
            "username":username,
            "password":"123456",
            "authorityId":1
          }
        },(err,response,body)=>{
          t.error(err)
          t.strictEqual(response.statusCode,200)
          index--
          if(index<=0)
          {
            resolve()
          }
        })
      }
    }),
    new Promise(function(resolve){
      let index=count
      for(let i =0;i<count;i++)
      { 
          request({
          method:'POST',
          uri:host+'/administrator/login',
          json:true,
          'content-type':'application/json',
          body:{
            "username":users[i],
            "password":"123456",
          }
        },(err,response,body)=>{
          t.error(err)
          t.strictEqual(response.statusCode,200)
          index--
          if(index<=0)
          {
            resolve()
          }
        })
      }
    }),
    new Promise(function(resolve){
      let index=count
      for(let i =0;i<count;i++)
      { 
          request({
          method:'POST',
          uri:host+'/administrator/edit',
          json:true,
          'content-type':'application/json',
          body:{
            "username":users[i],
            "authorityId":2
          }
        },(err,response,body)=>{
          t.error(err)
          t.strictEqual(response.statusCode,200)
          index--
          if(index<=0)
          {
            resolve()
          }
        })
      }
    }),
    new Promise(function(resolve){
      let index=count
      for(let i =0;i<count;i++)
      { 
          request({
          method:'POST',
          uri:host+'/administrator/logout',
          json:true,
          'content-type':'application/json',
          body:{
            "username":users[i]
          }
        },(err,response,body)=>{
          t.error(err)
          t.strictEqual(response.statusCode,200)
          index--
          if(index<=0)
          {
            resolve()
          }
        })
      }
    }),
    new Promise(function(resolve){
      let index=count
      for(let i =0;i<count;i++)
      { 
          request({
          method:'POST',
          uri:host+'/administrator/getList',
          json:true,
          'content-type':'application/json',
          body:{
            "limit":10,
            "offset":0
          }
        },(err,response,body)=>{
          t.error(err)
          t.strictEqual(response.statusCode,200)
          index--
          if(index<=0)
          {
            resolve()
          }
        })
      }
    }),,
    new Promise(function(resolve){
      let index=count
      for(let i =0;i<count;i++)
      { 
          request({
          method:'POST',
          uri:host+'/administrator/delete',
          json:true,
          'content-type':'application/json',
          body:{
            "username":users[i]
          }
        },(err,response,body)=>{
          t.error(err)
          t.strictEqual(response.statusCode,200)
          index--
          if(index<=0)
          {
            resolve()
          }
        })
      }
    })
  ])
  .then(function(result){
    t.end()
  })
})