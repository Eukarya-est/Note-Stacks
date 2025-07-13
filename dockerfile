FROM ubuntu:22.04

# Set up server
  # Install Python and pip
  RUN apt-get update && \
      apt-get install -y python3 \ 
      python3-pip \
      nodejs \
      npm && \
      apt-get clean && rm -rf /var/lib/apt/lists/*

  # Set work directory
  WORKDIR /app

  # Copy your Flask app code into the container
  COPY . /app

  # Move to the server directory
  WORKDIR /app/server

  # python virtual environment
  RUN pip3 install virtualenv

  # python environment
  RUN python3 -m virtualenv /app/server/env
  RUN /app/server/env/Scripts/activate

  # Install Flask and other dependencies
  RUN pip3 install Flask
  RUN pip3 install flask-mysql

  # Expose the Flask port
  EXPOSE 5001

  # Start the Flask server
  # Use the Flask command to run the server   
  RUN flask --app run server.py -p 5001

# Set up client
  # Move to the client directory
  WORKDIR /app/client

  # Install Node.js and npm
  RUN apt-get update && \
      apt-get install -y nodejs npm && \
      apt-get clean && rm -rf /var/lib/apt/lists/*
  
  RUN npm install -g npm@latest
  RUN npm install -g vite
  RUN npm vite build

  # Install dependencies
  RUN npm install react-router-dom





