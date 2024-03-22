
pipeline {
    agent any
   
    
    stages {
        stage('checkout') {
            steps {
               checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'python207', url: 'https://github.com/demesne2001/WebReportFrontG.git']])
                echo 'checkout done'
            }
        }
        

        stage('Docker Image') {
            steps {
                
                script{
                    def a=0
                    bat 'docker build . -f dockerfile.txt -t  GSoftfront'
                    a=1
                    if(a>0)
                    {
                         bat 'docker stop GSoftfront'
                         bat 'docker rm GSoftfront'
                    }
                }
                echo 'Docker Image done'
            }
        }
        stage('Docker Run') {
            steps {
                script{
                    bat 'docker run -p 3000:3000 -d --name GSoftfront GSoftfront'
                }
                echo 'Docker Running'
            }
        }
        stage('Docker push') {
            steps {
                script{
                    bat 'docker login -u patelom0910 -p 09102001Om'
                }
                echo 'Docker push done'
            }
        }
    }
}
