# Kubernetes command-line tool

Pods managing:

```CMD
> kubectl apply --filename <deployment-file> | <service-file> | <job-file>
> kubectl get pods [-A, --all-namespaces] [-o wide, --output=wide]
> kubectl get services
> kubectl get deployment
> kubectl logs <workload-name>
```

```CMD
> kubectl exec [-i, --stdin] [-t, --tty] <pod-name> -- bash
> kubectl port-forward <pod-name> <local-port>:<remote-port>
```
