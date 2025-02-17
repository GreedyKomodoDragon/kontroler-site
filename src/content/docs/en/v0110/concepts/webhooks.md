---
title: "Webhooks"
description: "Learn how to use webhooks with Kontroler tasks"
---

## Webhooks in Kontroler

Webhooks allow external systems to receive real-time notifications about task execution status. When configured, Kontroler sends HTTP POST requests with task status information to your specified endpoints.

## Basic Configuration

Add webhook configuration to your DAG:

```yaml
apiVersion: kontroler.greedykomodo/v1alpha1
kind: DAG
metadata:
  name: webhook-example
spec:
  webhook:
    verifySSL: true
    url: "http://your-webhook-endpoint:8080/webhook"
  task:
    - name: "example-task"
      # ... task configuration ...
```

## Webhook Payload

When a task completes, Kontroler sends a JSON payload to your webhook endpoint:

```json
{
  "status": "success",    // or "failed"
  "dagRunId": 123,       // unique identifier for the DAG run
  "taskName": "task-1"   // name of the task that completed
}
```

## Configuration Options

### SSL Verification
```yaml
webhook:
  verifySSL: true    # Enable SSL certificate verification
  url: "https://secure-endpoint.com/webhook"
```

### Multiple Tasks
```yaml
spec:
  webhook:
    url: "http://notification-service/webhook"
  task:
    - name: "task-1"
      # ... task config ...
    - name: "task-2"
      # ... task config ...
```

## Best Practices

1. **Endpoint Reliability**
   - Ensure webhook endpoints are highly available
   - Implement proper error handling

2. **Security**
   - Use HTTPS endpoints
   - Allows insecure if needed
   - Enable SSL verification when possible

## Example Implementation

Here's a complete example:

```yaml
apiVersion: kontroler.greedykomodo/v1alpha1
kind: DAG
metadata:
  name: notification-workflow
spec:
  webhook:
    verifySSL: true
    url: "https://notification-service.example.com/webhook"
  task:
    - name: "processing-task"
      command: ["python"]
      args: ["process.py"]
      image: "python:3.9"
```

## Possible Use Cases

1. **Notification Systems**
   - Alert teams about task completion
   - Trigger notifications on failures
   - Update status dashboards

2. **Workflow Coordination**
   - Trigger external processes
   - Update related systems
   - Maintain audit trails

3. **Monitoring**
   - Track task completion rates
   - Monitor execution times
   - Collect performance metrics

## Troubleshooting

1. **Connection Issues**
   - Verify endpoint accessibility
   - Check network policies
   - Validate SSL certificates

2. **Payload Problems**
   - Validate JSON format
   - Check payload size
   - Verify content types

3. **Security**
   - Check SSL configuration
   - Verify authentication
   - Review access permissions

