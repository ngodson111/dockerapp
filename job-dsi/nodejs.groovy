job("Product Service"){
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
        shell('npm install')
    }
}