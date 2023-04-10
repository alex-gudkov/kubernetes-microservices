# Pull an Image from a Private Registry

To pull images from a private registry you need to authenticate with container registry which hosts private images:

Log in to Docker Hub using your GitLab account:

```CMD
> docker login registry.gitlab.com
```

Login process creates or updates config.json that holds an authorization token:

```JSON
{
    "auths": {
            "registry.gitlab.com": {
                    "auth": "<docker-password>"
            }
    },
}
```

Create secret (named regcred) by providing credentials on the command line:

```CMD
> kubectl create secret docker-registry regcred
    --docker-server="registry.gitlab.com" \
    --docker-username="<gitlab-username>" \
    --docker-password="<gitlab-password>" \
    --docker-email=dockeremail@mail.net
secret/regcred created

> kubectl get secret regcred
```

Add configuration in file which uses private image:

```YAML
containers:
    -   image: <your-private-image>
imagePullSecrets:
    -   name: regcred
```
