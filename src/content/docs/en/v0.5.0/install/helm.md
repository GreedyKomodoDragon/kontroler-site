---
title: "Helm Chart"
description: "Explaining how to use the helm chart"
---

Currently Kontroler only officially support deploying via a Helm chart. We aim to give this version in the same way as the applications so that if you use 0.5.x of the helm chart, you can use 0.5.x version of the applications.

## Mono Helm Chart

The Helm chart is set up so that you can use a single deployment to manage the controller, server and UI in the same deployment. Equally, you can use three instances of the helm chart to have more fine-control over each component.

The singular helm chart also contains the CRDs so it is recommended to enable this in one deployment and nothing else, then another deployment that handles the applications. This way you do not accidently remove the CRDs when you are trying to remove the UI for example!

## Getting the Helm Chart

Currently we do not publish the helm chart anywhere so you will need to clone down the repo and then change directory (cd) into the helm/kontroler helm chart.

The plan is to push the Helm Chart to a public registry at some point in the future.

## Helm Values

Below is the documented table for each of the values. 


| Key | Type | Default | Description |
|-----|------|---------|-------------|
| certManager.enabled | bool | `true` |  |
| certManager.issuer.enabled | bool | `true` |  |
| certManager.issuer.spec.selfSigned | object | `{}` |  |
| certManager.issuerRef.kind | string | `"Issuer"` |  |
| certManager.issuerRef.name | string | `"operator-selfsigned-issuer"` |  |
| controller.affinity | object | `{}` |  |
| controller.db.password.key | string | `"password"` |  |
| controller.db.password.secret | string | `"postgres-kontroler-password"` |  |
| controller.db.ssl.mode | string | `"require"` |  |
| controller.db.ssl.paths.ca.filename | string | `"ca.crt"` |  |
| controller.db.ssl.paths.ca.path | string | `"/etc/kontroler/ssl/"` |  |
| controller.db.ssl.paths.cert.filename | string | `"client.crt"` |  |
| controller.db.ssl.paths.cert.path | string | `"/etc/kontroler/ssl/"` |  |
| controller.db.ssl.paths.key.filename | string | `"client.key"` |  |
| controller.db.ssl.paths.key.path | string | `"/etc/kontroler/ssl/"` |  |
| controller.db.ssl.secret | string | `"postgresql-client-tls"` |  |
| controller.db.user | string | `"postgres"` |  |
| controller.enabled | bool | `true` |  |
| controller.image | string | `"greedykomodo/kontroler-controller:0.0.1"` |  |
| controller.nodeSelector | object | `{}` |  |
| controller.podAnnotations | object | `{}` |  |
| controller.podSecurityContext | object | `{}` |  |
| controller.resources | object | `{}` |  |
| controller.securityContext | object | `{}` |  |
| controller.serviceAccount.annotations | object | `{}` |  |
| controller.serviceAccount.create | bool | `true` |  |
| controller.serviceAccount.name | string | `""` |  |
| controller.tolerations | object | `{}` |  |
| crds.install | bool | `true` |  |
| crds.retain | bool | `false` |  |
| db.endpoint | string | `"my-release-postgresql.default.svc.cluster.local:5432"` |  |
| db.name | string | `"kontroler"` |  |
| fullnameOverride | string | `""` |  |
| imagePullSecrets | list | `[]` |  |
| nameOverride | string | `""` |  |
| rbac.namespaces[0] | string | `"default"` |  |
| rbac.namespaces[1] | string | `"dev"` |  |
| server.affinity | object | `{}` |  |
| server.auditLogs | bool | `true` |  |
| server.autoscaling.enabled | bool | `false` |  |
| server.autoscaling.maxReplicas | int | `100` |  |
| server.autoscaling.minReplicas | int | `1` |  |
| server.autoscaling.targetCPUUtilizationPercentage | int | `80` |  |
| server.db.password.key | string | `"password"` |  |
| server.db.password.secret | string | `"postgres-kontroler-password"` |  |
| server.db.ssl.mode | string | `"require"` |  |
| server.db.ssl.paths.ca.filename | string | `"ca.crt"` |  |
| server.db.ssl.paths.ca.path | string | `"/etc/kontroler/ssl/"` |  |
| server.db.ssl.paths.cert.filename | string | `"client.crt"` |  |
| server.db.ssl.paths.cert.path | string | `"/etc/kontroler/ssl/"` |  |
| server.db.ssl.paths.key.filename | string | `"client.key"` |  |
| server.db.ssl.paths.key.path | string | `"/etc/kontroler/ssl/"` |  |
| server.db.ssl.secret | string | `"postgresql-client-tls"` |  |
| server.db.user | string | `"postgres"` |  |
| server.enabled | bool | `true` |  |
| server.image | string | `"greedykomodo/kontroler-server:0.0.1"` |  |
| server.imagePullPolicy | string | `"Always"` |  |
| server.ingress.annotations | object | `{}` |  |
| server.ingress.className | string | `""` |  |
| server.ingress.enabled | bool | `false` |  |
| server.ingress.hosts[0].host | string | `"chart-example.local"` |  |
| server.ingress.hosts[0].paths[0].path | string | `"/"` |  |
| server.ingress.hosts[0].paths[0].pathType | string | `"ImplementationSpecific"` |  |
| server.ingress.tls | list | `[]` |  |
| server.jwt.key | string | `"jwt"` |  |
| server.jwt.secret | string | `"jwt-kontroller-key"` |  |
| server.mtls.certs.caCertSecretName | string | `"ca-secret"` |  |
| server.mtls.certs.certSecretName | string | `"my-tls-secret"` |  |
| server.mtls.certs.keySecretName | string | `"my-tls-secret"` |  |
| server.mtls.enabled | bool | `false` |  |
| server.mtls.insecure | bool | `true` |  |
| server.name | string | `"kontroler-server"` |  |
| server.nodeSelector | object | `{}` |  |
| server.podAnnotations | object | `{}` |  |
| server.podSecurityContext | object | `{}` |  |
| server.replicaCount | int | `1` |  |
| server.resources | object | `{}` |  |
| server.securityContext | object | `{}` |  |
| server.service.port | int | `8080` |  |
| server.service.type | string | `"ClusterIP"` |  |
| server.serviceAccount.annotations | object | `{}` |  |
| server.serviceAccount.create | bool | `true` |  |
| server.serviceAccount.name | string | `"server-sa"` |  |
| server.tolerations | object | `{}` |  |
| server.uiAddress | string | `"http://localhost:3000"` |  |
| ui.affinity | object | `{}` |  |
| ui.autoscaling.enabled | bool | `false` |  |
| ui.autoscaling.maxReplicas | int | `100` |  |
| ui.autoscaling.minReplicas | int | `1` |  |
| ui.autoscaling.targetCPUUtilizationPercentage | int | `80` |  |
| ui.enabled | bool | `true` |  |
| ui.env.API_URL | string | `"http://localhost:3000"` |  |
| ui.image | string | `"greedykomodo/kontroler-ui:0.0.1"` |  |
| ui.imagePullPolicy | string | `"Always"` |  |
| ui.ingress.annotations | object | `{}` |  |
| ui.ingress.className | string | `""` |  |
| ui.ingress.enabled | bool | `false` |  |
| ui.ingress.hosts[0].host | string | `"chart-example.local"` |  |
| ui.ingress.hosts[0].paths[0].path | string | `"/"` |  |
| ui.ingress.hosts[0].paths[0].pathType | string | `"ImplementationSpecific"` |  |
| ui.ingress.tls | list | `[]` |  |
| ui.name | string | `"kontroler-ui"` |  |
| ui.nginx.configOverride | string | `""` |  |
| ui.nginx.mtls.certs.caCertSecretName | string | `"ca-secret"` |  |
| ui.nginx.mtls.certs.certSecretName | string | `"my-tls-secret"` |  |
| ui.nginx.mtls.certs.keySecretName | string | `"my-tls-secret"` |  |
| ui.nginx.mtls.enabled | bool | `false` |  |
| ui.nginx.mtls.insecure | bool | `true` |  |
| ui.nginx.reverseProxy.caCertSecretName | string | `"ca-secret"` |  |
| ui.nginx.reverseProxy.certSecretName | string | `"my-tls-secret"` |  |
| ui.nginx.reverseProxy.enabled | bool | `true` |  |
| ui.nginx.reverseProxy.keySecretName | string | `"my-tls-secret"` |  |
| ui.nodeSelector | object | `{}` |  |
| ui.podAnnotations | object | `{}` |  |
| ui.podSecurityContext | object | `{}` |  |
| ui.replicaCount | int | `1` |  |
| ui.resources | object | `{}` |  |
| ui.securityContext | object | `{}` |  |
| ui.service.port | int | `3000` |  |
| ui.service.type | string | `"ClusterIP"` |  |
| ui.serviceAccount.annotations | object | `{}` |  |
| ui.serviceAccount.create | bool | `true` |  |
| ui.serviceAccount.name | string | `"ui-sa"` |  |
| ui.tolerations | object | `{}` |  |
