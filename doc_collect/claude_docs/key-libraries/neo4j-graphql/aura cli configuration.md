[](https://neo4j.com/docs)

*   [Neo4j GraphQL Library](../../)
*   [GraphQL for Neo4j AuraDB](../)
*   [Configuring the Aura CLI](./)

[Raise an issue](https://github.com/neo4j/docs-graphql/issues/new/?title=Docs%20Feedback%20modules/ROOT/pages/aura-graphql/aura-cli-configuration.adoc%20\(ref:%207.x\)&body=%3E%20Do%20not%20include%20confidential%20information,%20personal%20data,%20sensitive%20data,%20or%20other%20regulated%20data.)

# Configuring the Aura CLI

This is the documentation of the GraphQL Library version 7. For the long-term support (LTS) version 5, refer to [GraphQL Library version 5 LTS](/docs/graphql/5/).

GraphQL for Neo4j AuraDB is managed using the Aura Console or the beta commands of the Aura CLI. For the latter there are installation and configuration steps to be taken before you can use it.

## [](#_obtain_aura_api_credentials)Obtain Aura API credentials

The Aura CLI communicates with Neo4j AuraDB platform via an API. To use the API, a set of credentials is required. To get the credentials, follow these steps depending on which version of the console you are using.

1.  Log in to the [Neo4j Aura Console](https://console.neo4j.io/).
    
2.  Navigate to the top right and select your account name, then **API keys** from the dropdown menu.
    
    ![account dropdown](../../_images/aura-graphql/aura-cli/account-dropdown.png)
    
3.  The menu shows existing API keys if you already have any.
    
    ![api keys](../../_images/aura-graphql/aura-cli/api-keys.png)
    
4.  Use **Create**, then enter a a name for the API key and confirm with **Create**.
    
    ![api keys create](../../_images/aura-graphql/aura-cli/api-keys-create.png)
    
5.  The client ID and client secret are displayed. Be sure to record or save these as the client secret will not be shown again.
    
    ![api keys created](../../_images/aura-graphql/aura-cli/api-keys-created.png)
    

## [](#_install_the_aura_cli)Install the Aura CLI

1.  Navigate to [https://github.com/neo4j/aura-cli/releases/tag/v1.1.0](https://github.com/neo4j/aura-cli/releases/tag/v1.1.0) in your browser.
    
    Use Aura CLI version 1.1.0 or higher for managing your GraphQL APIs.
    
2.  Download the compressed file that matches your system. Make a note of the folder where the file is located.
    
3.  After the file has been downloaded, extract the contents.
    
4.  Open a command prompt and move to the location where you extracted the files.
    
5.  Complete the installation by moving the aura-cli executable file into the file path.
    
    1.  Mac/Linux users:
        
        ```bash hljs
        sudo mv aura-cli /usr/local/bin
        ```
        
    2.  Windows users:
        
        ```cmd hljs
        move aura-cli c:\windows\system32
        ```
        
    
6.  At the command prompt, type:
    
    ```bash hljs
    aura-cli -v
    ```
    
7.  You should see this:
    
    ```bash hljs
    aura version v1.1.0
    ```
    

If you are using a Mac, you may receive a warning from Apple that aura-cli could not be verified. If this happens, navigate to **System Settings**, then **Privacy & Security** on the left, and scroll down on the right. Select **Open Anyway**. This should not happen again. The aura-cli has been through the Apple certification process but it can take time to trickle down through the Apple ecosystem.

## [](#_configure_the_aura_cli)Configure the Aura CLI

Configure the Aura CLI with the Aura API client ID and client secret you obtained in [Obtain Aura API credentials](#_obtain_aura_api_credentials).

1.  On the command line, execute the following:
    
    ```bash hljs
    aura-cli credential add --name  --client-id  --client-secret 
    ```
    
2.  To verify that the credentials are working, list your Aura instances:
    
    ```bash hljs
    aura-cli instance list
    ```
    

### [](#_enable_the_beta_commands)Enable the beta commands

Set the configuration option to make available the beta commands to use GraphQL for Neo4j AuraDB with the Aura CLI.

1.  On the command line, execute the following:
    
    ```bash hljs
    aura-cli config set beta-enabled true
    ```
    
2.  Check if the commands are listed:
    
    ```bash hljs
    aura-cli data-api graphql
    ```
    
3.  You should see this:
    
    ```bash hljs
    Allows you to programmatically provision and manage your GraphQL APIs
    
    Usage:
      aura-cli data-api graphql [command]
    
    Available Commands:
      auth-provider Allows you to programmatically manage Authentication providers for a specific GraphQL Data API
      cors-policy   Allows you to manage the Cross-Origin Resource Sharing (CORS) policy for a specific GraphQL Data API
      create        Creates a new GraphQL Data API
      delete        Delete a GraphQL Data API
      get           Get details of a GraphQL Data API
      list          Returns a list of GraphQL Data APIs
      pause         Pause a GraphQL Data API
      resume        Resume a GraphQL Data API
      update        Edit a GraphQL Data API
    
    Flags:
      -h, --help   help for graphql
    
    Global Flags:
          --auth-url string
          --base-url string
          --output string
    
    Use "aura-cli data-api graphql [command] --help" for more information about a command.
    ```
    

[Using your GraphQL API](../api-usage/) [Introspector](../../introspector/)