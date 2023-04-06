# Kubernetes command-line tool

Pods managing:

```CMD
> kubectl apply --filename <deployment-file> | <service-file> | <job-file>
> kubectl get pods [-A, --all-namespaces] [-o wide, --output=wide]
> kubectl get services | svc
> kubectl get storageclass | sc
> kubectl get deployment
> kubectl get persistentvolumeclaim | pvc
> kubectl logs <workload-name>
```

```CMD
> kubectl exec [-i, --stdin] [-t, --tty] <pod-name> -- bash
> kubectl port-forward <pod-name> <local-port>:<remote-port>
```
