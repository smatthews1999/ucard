$ ->

load = ->
  gapi.signin.render 'signinButton'

signinCallback = (auth) ->
  console.log 'signinCallback...'
  if auth

    console.log auth

    if auth.error
      console.log "sign in failed because: ", auth.error
    else
      console.log 'hooray you are signed in'
      $('#signinButton').hide()

      gapi.client.load "plus", "v1", ->
        request = gapi.client.plus.people.get(userId: "me")
        request.execute (resp) ->
          console.log resp

          imgurl = resp.image.url.substring(0,resp.image.url.lastIndexOf('?'))
          console.log imgurl
          $('#userData').append "<h3>Hello #{resp.displayName}</h3>
          <img src='#{ imgurl }' alt='No Photo' class='thumbnail'/>"


          return

        return

    return

  else
    console.log 'no auth object'

  return
