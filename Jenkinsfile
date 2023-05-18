pipeline {
  agent any
    
  tools {nodejs "nodejs"}
     
    stage('Build') {
      steps {
        sh 'npm install'
         sh '<<Build Command>>'
      }
    }  
    
    stage('Test') {
      steps {
        sh 'node test'
      }
    }
  }
}