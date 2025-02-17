---
title: "Pod Templates"
description: "Explaining what can be done with podtemplates in kontroler"
---

## Pod Template Configuration
You can customize the pod configuration for tasks using the `podTemplate` field:

```yaml
task:
  - name: "advanced-job"
    image: "your-image:tag"
    podTemplate:
      volumes:
        - name: example-pvc
          persistentVolumeClaim:
            claimName: example-claim  # The name of the PVC
      volumeMounts:
        - name: example-pvc
          mountPath: /data  # Path inside the container where the PVC is mounted
      imagePullSecrets:
        - name: my-registry-secret
      securityContext:
        runAsUser: 1000
        runAsGroup: 3000
        fsGroup: 2000
      nodeSelector:
        disktype: ssd
      tolerations:
        - key: "key1"
          operator: "Equal"
          value: "value1"
          effect: "NoSchedule"
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
              - matchExpressions:
                  - key: "kubernetes.io/e2e-az-name"
                    operator: In
                    values:
                      - e2e-az1
                      - e2e-az2
      serviceAccountName: "custom-service-account"
      automountServiceAccountToken: false
```

This configuration allows you to:
- Mount persistent volumes
- Use private registries
- Set security contexts
- Configure node selection
- Define pod affinity rules
- Specify service accounts
- Control pod scheduling