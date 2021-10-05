# Why we need refresh token.

We need refresh token because the current access token has permanent validity, as we are storing the credentials on user's end, we have no way to revoke the access rights of the token.

## The Idea of refresh token

Is to save the refresh token on our end, and the `access token` will have a short expiration date.
We use `refresh token` to generate new `access token`.

We have to maintain a database of valid refreshtokens.

``` sh
Access tokens are temporarly (Expires)
Refresh tokens are permanent until revoked by system admin.
```

**So basically,**

**Login** -> *Get `refresh` and `access` token.*

**USE** -> *`access token {expires soon}`* -> *response*

When expired, get a `new access token` using `refresh token` on some `endpoint`.

**POST** -> *(refresh token)* -> Server/refreshToken 

Server will check if the refreshtoken is valid and send a new short lived access token in response.

*that's all there's to json web token.*

Thanks.