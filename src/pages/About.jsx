import React from 'react'

export default function About() {
  return (
    <section className="about-page">
      <h1 className="gallery-header">About This Site</h1>

      <p className="center-about">
        So I found this challenge from a Medium post. I had been unemployed for 4 weeks
        and I was looking for a project to do, something to learn and add to my resume in the meantime.
        I knew it was going to be devops plus some full-stack work, but I was eager to get into it.
      </p>
      <p className="center-about">
        I have had a nice document store in Notion for all of my notes for work and tooling, along with some personal language learning
        goals I have been tracking.
        I knew I was going to get some more experience with AWS and Python, 2 things I hadn't seriously worked with in a few years.
        Setting up my AWS root account, breaking out into prod and dev accounts were fairly quick, and once I had my S3 set up for document storage,
        I worked on building out a Github Action so that when I made a commit to my project, it would trigger a build and deploy to my S3 bucket.
        This work was done in a day, and then I set out on the rusty stuff: Python and Django.
      </p>
      <p className="center-about">
        Using python again was like relearning how to ride a bike. Once I got my feet back up under me, I was off to the races.
        I had the backend built and containerized in a Docker container with a Postgres database and a Django app in a couple days.
        There were a few changes to Django that threw me for a loop, but I was good after I spent an evening reading through the docs and falling asleep
        to a 13-hour Django tutorial on YouTube. Once all the pages and backend was built, it was on to the part of IT I've
        intentionally avoided the whole time: frontend HTML/CSS and Javascript.
      </p>
      <p className="center-about">
        It's not that I don't like frontend work, it's just that I know I'm not visually creative at all.
        You don't want me designing anything outside of something minimalistic. I can appreciate good design, but I can't do it myself.
        I like things simple and I want them to work, but anyone can throw up a basic webpage in Arial sans serif and call it a day.
        This was designed to be a challenge, so I did want to challenge myself and have it look good. I realized early how much AI can ruin
        your ability to learn something on my own. There were tools like Webflow that allowed you to export your HTML and CSS and not
        have to write it, aka understand what's actually happening yourself. As a security guy, I really can't let
        nefarious activities like that slide. Plus it's not a challenge if I just click a bunch of boxes and copy off a Youtube tutorial,
        so I decided to do it all by hand.
      </p>

      <div className="container-img-about">
        <img
          className="center-img-about"
          src="/images/bill.gif"
          alt="Bill O Reilly doing it live"
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = '/images/about-placeholder.svg'
          }}
        />
        <p className="subtext-img">Me doing it live</p>
      </div>

      <p className="center-about">
        Man, learning HTML and CSS was a beast. It was fairly simple to understand, but the amount of CMD+S, Alt-Tab, and refresh is insane.
        I definitely see the benefits of using something like Webflow in the future, but for now, I'm glad I did it all solo dolo.
        It makes sense to understand what UI/UX actually does after all, and getting a full grasp of all moving parts.
        Learning Javascript was a bit easier, but I also wasn't trying to do anything complicated this time, though I
        do have future plans to jazz up the photo page a bit more.
      </p>
      <p className="center-about">
        Meanwhile, during all this I'm still studying for the AWS Cloud Practitioner exam. I've been watching training videos on Youtube off and on,
        not really putting too much focus into it.
      </p>

      <h3 className="center-about">ONE WEEK LATER</h3>
      <p className="center-about">
        Wow, I spent an incredible amount of time trying to force feed myself everything I could about Kubernetes and Helm the last couple of days.
        I finally got my local Docker K8s cluster up and running, and I was able to deploy my Django app to it. I had to learn how to use Helm to deploy
        my app to the cluster, and I had an extreme amount of errors, mostly from things not properly passing off environment variables down the line.
        My brain is great under pressure but I feel like I just tried to swallow a star. Next up is deploying this to AWS. I haven't decided yet
        between EKS and Farscape. I may try both just for the experience.
      </p>

      <h3 className="center-about">ANOTHER WEEK LATER</h3>
      <p className="center-about">
        I've been working on this for a month now, and I'm finally done. I've got my Django app running in a Docker container,
        deployed to EC2, with a load balancer in front to handle all SSL requests. Trying to figure out the new application load balancers compared to the classic version
        took me way more time than I am comfortable with. For some reason using the ALB always resulted in either a 502 or a 504 error, and I had to go back and forth trying to figure out
        whether it was a route53 issue, an ALB issue, or an issue with my Docker container. Eventually I resigned to using a classic load balancer and we were up and running within 10 minutes.
        I've got a lot of work to do on the frontend in regards to design,
        jazzing up the photo page, and adding some more features (like the "What am I listening to on Spotify" module I've slowly worked on in the background),
        but I'm happy with the progress I've made. I still now have to connect to the Postgres DB in RDS, but the Sqlite3 DB will work in the time being.
        I've learned a lot about AWS, Python, Django, Docker, Kubernetes, Helm, and CSS. Next up, I'm going to start studying for the AWS Solutions Architect exam.
      </p>
      <p className="center-about">
        Might also just toss up my bug bounty checklist I've been building out in Notion and put it up here. Or just turn this whole thing into a blog.
      </p>
      <p className="center-about">
        Thanks for checking out my cloud challenge website.
      </p>
    </section>
  )
}
