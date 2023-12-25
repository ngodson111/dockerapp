job("Ecommerce Service"){
    scm {
        git('https://github.com/ngodson111/dockerapp.git') { node -> 
            node / gitConfigName('ngodson')
            node / gitConfigEmail('narannpn@gmail.com')
        }
    }
    triggers {
        scm('H/5 * * * *')
    }
    wrappers {
        nodejs('NodeJS')
    }
    steps {
        dockerBuildAndPublish {
            repositoryName('ngodson/ecommerce-service')
            tag('${GIT_REVISION,length=9}')
            registryCredentials('dockerhub')
            forcePull(false)
            forceTag(false)
            createFingerprints(hubfalse)
            skipDecorate()
        }
    }
}