---
layout: post
title: Rsync with Github actions when using a a custom port
slug: rsync-with-github-actions-when-using-a-custom-port
tags: ['DevOps', 'shell', 'github actions']
---

If you want to rsync with a custom port in a GitHub action, you need to do three steps:

1. Add the port to as a secret
2. Add the port to known_hosts file
3. Perform the rsync action

<!-- more -->

This article picks off from [Rsync with GitHub actions](/blog/github-actions-deploy) so make sure you read that article first if you’ve never tried to do a rsync in GitHub actions (without a custom port) yet.

## Adding the port as a secret

Follow the same steps written in Rsync with GitHub actions to add the port as a secret.

You should be able to use the port like this when you’re done.

```shell
${{ secrets.SSH_PORT }}
```

## Adding the port as to the known_hosts file

We need to add the port to the `known_hosts` file. If the port doesn’t exist, the ssh connection will fail.

You can add the port to the `known_hosts` file with the following code:

```yaml
name: Deploy with rsync
run: ssh-keyscan -p ${{ secrets.SSH_PORT }} -H ${{ secrets.SSH_HOST }} >> ~/.ssh/known_hosts
```

`-p` specifies the port. Make sure `-p` goes before `-H` or you'll receive an error.

## Adding the port to the rsync command

You can add the port to the rsync command with the `-e` flag as I mentioned in [rsync with a custom port](/blog/rsync-with-custom-port).

Once you add the `-e` flag, you can use `-p` to specify the custom port.

```shell
rsync -avz -e "ssh -p ${{ secrets.SSH_PORT }}" ./dist/ ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}:/path-to-destination
```

That's it.
