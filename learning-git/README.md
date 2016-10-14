# Learning Git

1. Create an account on [Github](http://www.github.com).

2. Create a code "repository"

3. Download [Git](http://www.git-scm.com)

4. Open Git Bash.  Navigate to your Github folder in My Documents.
    
>    cd (folderName)   
>    cd ..

4. Start by cloning your repository.
    
>    git clone (githubCloneUrl)

6. Let's edit the README. First, create an issue on Github.

7. Checkout a branch called update-readme
    
>    git checkout -b issueNumber/update-readme

8. Write something in the README. For example:
    
>    This is my first change using github!

9. Now lets go back to the git bash and add our changes
    
>    git add -A

10. Now commit them to your branch, and add a message describing what you did.
    
>    git commit -m "Update README"

11. Now push them to your branch
    
>    git push origin head

12. Now on github, you have Pull Requests. Create a Pull Request for your issue.

13. Have someone in your team check your code, make sure it looks good (aesthetically and technically), be sure to comment out long or complex methods.

14. Merge the Pull Request with master and delete the branch on Github.

15. In the Git Bash, go back to the master branch
    
>    git checkout master

16. Pull your new changes into the master branch
    
>    git pull

**Congrats! You've just completed your first Git PR!**

*Some Basic Commands*

    cd (folderName) : change directories into a different folder
    cd .. : go out of your current folder
    ls : see all files and folder in your current folder
    git help : list all available commands for git
    git clone (githubCloneUrl) : clone an online repository onto your computer
    git pull : pull the latest changes from the code repository into your local version
    git checkout -b (branchName) : create an isolated branch that you will complete a certain bugfix or feature in
    git add -A : add all changes to this commit
    git commit -m "message goes here" : add a commit message to this commit; what did you change?
    git push origin head : push your changes to the online repository
