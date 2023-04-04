# Kubernetes command-line tool

Pods managing:

```CMD
> kubectl apply --filename <deployment-file> | <service-file> | <job-file>
> kubectl get pods [-A, --all-namespaces=false] [-o wide, --output="wide"]
> kubectl get services
> kubectl get deployment
> kubectl logs <workload-name>
```

```CMD
> kubectl exec -it <container-name> -- bash
```
