---
title: "CronJobs in Kontroler"
description: "Learn how to create and manage scheduled workflows with Kontroler"
---

## Creating CronJobs

Kontroler makes it easy to create scheduled workflows using cron syntax. These workflows can be configured with retry logic, conditional execution, and sophisticated error handling.

## Basic CronJob Structure

Here's a simple example that runs every minute and demonstrates retry logic:

```yaml
apiVersion: kontroler.greedykomodo/v1alpha1
kind: DAG
metadata:
  name: cronjob
spec:
  schedule: "*/1 * * * *"
  task:
    - name: "job"
      command: ["sh", "-c"]
      args:
        [
          "if [ $((RANDOM%2)) -eq 0 ]; then echo $second; else exit 1; fi",
        ]
      image: "alpine:latest"
      backoff:
        limit: 3
      conditional:
        enabled: true
        retryCodes: [1]
```

### Breaking Down the Components

1. **Schedule Definition**
   ```yaml
   schedule: "*/1 * * * *"
   ```
   - Uses standard cron syntax
   - This example runs every minute
   - Supports all cron expressions

2. **Task Configuration**
   ```yaml
   task:
     - name: "job"
       image: "alpine:latest"
   ```
   - Defines the task to be executed
   - Specifies the container image
   - Each task must have a unique name

3. **Command and Arguments**
   ```yaml
   command: ["sh", "-c"]
   args:
     ["if [ $((RANDOM%2)) -eq 0 ]; then echo $second; else exit 1; fi"]
   ```
   - Sets the command to run
   - Arguments are passed as an array
   - Supports shell commands and scripts

4. **Retry Configuration**
   ```yaml
   backoff:
     limit: 3
   conditional:
     enabled: true
     retryCodes: [1]
   ```
   - `backoff.limit`: Maximum number of retries
   - `conditional.enabled`: Enables conditional retries
   - `retryCodes`: Exit codes that trigger retries

## Common Cron Patterns

```yaml
# Every 5 minutes
schedule: "*/5 * * * *"

# Every hour
schedule: "0 * * * *"

# Every day at midnight
schedule: "0 0 * * *"

# Every Monday at 9am
schedule: "0 9 * * 1"
```

## Best Practices

1. **Error Handling**
   - Always define retry conditions
   - Use appropriate backoff limits
   - Consider retry codes carefully

2. **Resource Management**
   ```yaml
   task:
     - name: "job"
       resources:
         requests:
           cpu: "100m"
           memory: "128Mi"
         limits:
           cpu: "200m"
           memory: "256Mi"
   ```

3. **Logging**
   - Use clear task names
   - Output meaningful logs
   - Consider log retention
