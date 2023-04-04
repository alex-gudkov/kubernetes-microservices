# Google Cloud SDK

Kubernetes set up:

```TEXT
> gcloud init
> gcloud services enable container.googleapis.com
> gcloud config set project positive-winter-382706
> gcloud config list project

> gcloud components install gke-gcloud-auth-plugin
> setx USE_GKE_GCLOUD_AUTH_PLUGIN "True"
> gcloud container clusters get-credentials autopilot-cluster-1 --region europe-west9 --project positive-winter-382706

> kubectl cluster-info
> kubectl get namespaces
> kubectl get pods
```

```TEXT
> kubectl apply --filename <deployment-file> | <service-file> | <job-file>
> kubectl get pods
> kubectl logs <workload-names>

```
