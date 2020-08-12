#!/usr/bin/env bash

set -e # fail fast
set -x # print commands
 

echo $GIT_SSH_KEY > ./git-ssh
chmod 444 ./git-ssh 
export GIT_SSH_COMMAND='ssh -i ./git-ssh -o "StrictHostKeyChecking=no"'
git clone $ENVIRONMENT_REPO
for c in $(ls $ERN/cf)
do
    echo "Deploying CF from $c"
    CF_HOME=./$ERN/cf/$c cf push
done

for k in $(ls $ERN/k8s)
do
    echo "Deploying K8s from $k"
    kubectl create -f ./shopping-deploy.yaml --kubeconfig ./$ERN/k8s/$k/kubeconfig
done