import { src } from "gulp";
import ghPages from "gulp-gh-pages";
import gitRepoInfo from "git-repo-info";
import config from '../../config.json';

let info = gitRepoInfo();

export const deployMessage = () => {
    let i = process.argv.indexOf("--message");
    return i !== -1 ? process.argv[i+1] : false
}

export const sourceDeploy = () => 
    src([
      `${config.dir.dist}**/*`,
      `./.gitlab-ci.yml`,
    ])
    .pipe(ghPages({
      branch: 'master',
      message: deployMessage() ? `[DEPLOY]${deployMessage()}` : `[DEPLOY]${info.commitMessage}`
    }))