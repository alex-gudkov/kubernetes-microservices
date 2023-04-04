# Kubernetes

Set up Kubernetes in Google Cloud Platform:

```CMD
> gcloud init
> gcloud services enable container.googleapis.com
> gcloud config set project positive-winter-382706
> gcloud config list project

> gcloud components install gke-gcloud-auth-plugin
> setx USE_GKE_GCLOUD_AUTH_PLUGIN "True"
> gcloud container clusters get-credentials autopilot-cluster-1 --region europe-west9 --project positive-winter-382706

> kubectl cluster-info
> kubectl get namespaces
```

Kubernetes command-line tool:

```CMD
> kubectl apply --filename <deployment-file> | <service-file> | <job-file>
> kubectl get pods [-A, --all-namespaces=false] [-o wide, --output="wide"]
> kubectl get services
> kubectl get deployment
> kubectl logs <workload-name>
```
