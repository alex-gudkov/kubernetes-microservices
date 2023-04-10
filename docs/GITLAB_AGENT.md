# GitLab agent

Install Helm.

Connect to the cluster.

Run the command you copied when you registered agent with GitLab.

```CMD
> helm repo add gitlab https://charts.gitlab.io
> helm repo update
> helm upgrade --install <agent-name> gitlab/gitlab-agent \
    --namespace <gitlab-agent-namespace> \
    --create-namespace \
    --set image.tag=v15.11.0-rc2 \
    --set config.token=<agent-access-token> \
    --set config.kasAddress=wss://kas.gitlab.com
```
