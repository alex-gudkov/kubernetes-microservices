# Google Cloud Platform

Set up Kubernetes:

```CMD
> gcloud init
> gcloud services enable container.googleapis.com
> gcloud config set project <project-id>
> gcloud config list project
```

```CMD
> gcloud components install gke-gcloud-auth-plugin
> setx USE_GKE_GCLOUD_AUTH_PLUGIN "True"
> gcloud container clusters get-credentials <cluster-name> --region <location> --project <project-id>
```

Connection check:

```CMD
> kubectl cluster-info
> kubectl get namespaces
```
