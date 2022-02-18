import { prussianblue, darkelectricblue } from "../assets/colors/Colors";

export const onLeaveMsg = (move, tl, success) => {
  if (success) return;
  tl.pause();
};

export const onEnterMsg = (move, tl, success) => {
  if (success) return;
  tl.to(move, {
    duration: 0.5,
    ease: "ease",
    x: 5,
  })
    .to(move, {
      duration: 1,
      ease: "ease",
      x: -5,
    })
    .to(move, {
      duration: 0.5,
      ease: "ease",
      x: 0,
    });

  tl.play();
};

export const onSendMsg = (move, tl) => {
  tl.fromTo(
    move,
    {
      duration: 0.5,
      ease: "ease",
      opacity: 1,
      x: 0,
    },
    {
      duration: 0.5,
      ease: "ease",
      opacity: 0,
      x: 50,
    }
  );
};

export const afterSendMsg = (move, tl, tl2) => {
  tl.to(move, {
    duration: 0.5,
    ease: "ease",
    opacity: 1,
    x: 0,
  });
  tl2.pause();
};

export const onEnterSocial = (
  container,
  textOne,
  textTwo,
  textThree,
  image,
  image2,
  tl,
  tl2,
  index
) => {
  if (tl[index].isActive()) {
    console.log("isActive");
    return;
  }

  if (tl2[index].isActive()) {
    console.log("isActive");
    return;
  }

  tl[index]
    .add("start")
    .to(
      container,
      {
        duration: 0.5,
        top: 0,
        ease: "ease",
      },
      "start"
    )
    .to(
      textOne,
      {
        duration: 0.5,
        opacity: 0,
        y: -25,
        //display: "none",
        ease: "ease",
      },
      "start"
    )
    .to(
      textTwo,
      {
        duration: 0.5,
        y: -15,
        ease: "ease",
      },
      "start"
    )
    .to(textThree, {
      duration: 0.5,
      opacity: 1,
      y: -10,
      display: "block",
      ease: "ease",
    });

  tl2[index]
    .add("start")
    .to(
      image,
      {
        duration: 0.25,
        ease: "ease",
        opacity: 0,
        display: "none",
      },
      "start"
    )
    .to(image2, {
      duration: 0.25,
      ease: "ease",
      opacity: 1,
      display: "block",
    });
};

export const onLeaveSocial = (
  container,
  textOne,
  textTwo,
  textThree,
  image,
  image2,
  tl,
  tl2,
  index
) => {
  tl[index]
    .add("start")
    .to(
      container,
      {
        duration: 0.5,
        top: 10,
        ease: "ease",
      },
      "start"
    )
    .to(
      textOne,
      {
        duration: 0.5,
        opacity: 1,
        y: 0,
        ease: "ease",
      },
      "start"
    )
    .to(
      textTwo,
      {
        duration: 0.5,
        ease: "ease",
        y: 0,
      },
      "start"
    )
    .to(
      textThree,
      {
        duration: 0.5,
        opacity: 0,
        y: 0,
        //display: "none",
        ease: "ease",
      },
      "start"
    );

  tl2[index]
    .add("start")
    .to(
      image2,
      {
        duration: 0.25,
        ease: "ease",
        opacity: 0,
        display: "none",
      },
      "start"
    )
    .to(image, {
      duration: 0.25,
      ease: "ease",
      opacity: 1,
      display: "block",
    });
};

export const onClickSocial = (div, tl) => {
  tl.to(div, {
    duration: 0.5,
    opacity: 0.75,
    backgroundColor: prussianblue,
  }).to(div, {
    duration: 0.5,
    opacity: 1,
    backgroundColor: darkelectricblue,
  });
};
