# GitLab Runner

Installation and set up:

```CMD
> sudo curl -L --output /usr/local/bin/gitlab-runner "https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64"
> sudo chmod +x /usr/local/bin/gitlab-runner
> sudo gitlab-runner register \
    --non-interactive \
    --url "https://gitlab.com/" \
    --registration-token <project-registration-token> \
    --executor "docker" \
    --docker-image <image-name> \
    --description "" \
    --maintenance-note "" \
    --tag-list ""
> sudo useradd --comment 'GitLab Runner' --create-home gitlab-runner --shell /bin/bash
> sudo gitlab-runner install --user=gitlab-runner --working-directory=/home/gitlab-runner
> sudo gitlab-runner start
> sudo gitlab-runner run
```
