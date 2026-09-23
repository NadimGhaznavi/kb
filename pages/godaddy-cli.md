---
title: GoDaddy CLI Tool
layout: default
---

## Download and Install GoDaddy CLI Tool

```sh
cd /opt/dev
git clone https://github.com/godaddy/cli
mv cli godaddy-cli-0.2.20
cd godaddy-cli-0.2.20
bash ./install.sh --prefix /opt/prod/godaddy-cli-0.2.20
cd /opt/prod
rm -f godaddy-cli
ln -s godaddy-cli-0.2.20 godaddy-cli
```

## PAT Scopes

The following table lists the Domains API scopes you can assign when generating a PAT. Each scope enables specific operations. A write-scoped token satisfies read operations for the same resource; a read-scoped token is refused on writes. Go to Generate a PAT for step-by-step instructions on how to generate a PAT.

When you generate a token, the Domains & DNS bundle in the scope picker selects all scopes below. You can expand it to grant a subset instead.

| Scope | Required to |
| --- | --- |
| `domains.domain:read` | Read domain records, availability, suggestions, quotes, and operations |
| `domains.domain:create` | Register domains |
| `domains.domain:update` | Modify domain settings |
| `domains.domain:delete` | Delete or cancel domains |
| `domains.dns:update` | Create, update, and delete DNS zone records |
| `domains.nameserver:update` | Replace authoritative nameservers for a domain |
| `domains.host:update` | Modify domain host records |
| `domains.forward:update` | Configure domain forwarding |
| `domains.contact:update` | Update registrant, admin, or tech contacts |
| `domains.transfer:execute` | Initiate an inbound domain transfer |
| `domains.transfer:update` | Modify a transfer in progress |

## Generate a GoDaddy PAT

The following steps explain how to generate a PAT to authenticate GoDaddy API calls.

1. Sign in to the [Personal Access Token](https://developer.godaddy.com/personal-access-token) page.
2. Click + Generate Token.
3. In the Generate personal access token dialog, complete the following fields:

| Field	     | Description	                          
|------------|----------------------------------------
| Name       | Name for the token.	                  
| Expiration | Number of days until the token expires.
| Scopes     | Scopes for the token.                  

4. Click Generate Token.

## Store your token securely

After generating the token, it displays once. You can't retrieve it again from the Personal Access Token page and you should store it in secure storage immediately. Don't commit it to source control, check it into a repo, or paste it into chat.

In the Copy your new token dialog, click the copy icon.
Save the token in a password manager, secrets manager, or your application's secure credential store.
Load the token at runtime when you need it as a local script in a shell session or as a secret in a secrets store or CI/CD environment variable:

## Use a token

The following steps explain how to use a PAT to authenticate GoDaddy API calls.

Add the header to every request:

`Authorization: Bearer ${GODADDY_PAT}`

## Links

### GoDaddy

- [CLI on GitHub](https://github.com/godaddy/cli)
- [PAT Authentication Docs](https://developer.godaddy.com/en/docs/api-users/auth)
- [Authentication Walkthgrough](https://developer.godaddy.com/en/docs/api-users/auth/how-to)
