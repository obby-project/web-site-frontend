import { Inter } from "@next/font/google";
import { useForm } from "react-hook-form";
import { Input, Textarea } from "@/ui";
import { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  ChevronRightIcon,
  ChevronLeftIcon,
  MusicalNoteIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";

const url =
  process.env.NODE_ENV === "production"
    ? "https://obby-project.com"
    : "http://localhost:8081";

const isValueExists = async (key: string, value: string) => {
  try {
    const res = await fetch(`${url}/api/v1/value-exists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key, value }),
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const createUser = async (data: any) => {
  try {
    const res = await fetch(`${url}/api/v1/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};
export default function Index() {
  return (
    <StepperProvider>
      <Form />
    </StepperProvider>
  );
}

const Form = () => {
  const { isFormSubmitted } = useStepper();
  const isMobile = useMediaQuery("(min-width: 280px) and (max-width: 540px)");
  const isTablet = useMediaQuery("(min-width: 540px) and (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isStepperOpen, setStepperIsOpen] = useState(false);

  const size = isDesktop ? "desktop-v" : isTablet ? "tablet-v" : "mobile-v";
  const onEnded = (event: any) => {
    const video = event.target;

    if (video.ended) {
      video.loop = true;
      video.play();
    }
    setStepperIsOpen(true);
  };
  const onSkip = () => {
    setStepperIsOpen(true);
  };

  return (
    <div className="">
      <VideoComponent
        onEnded={onEnded}
        onSkip={onSkip}
        src={`/backgrounds/${size}.mp4`}
      />
      {isStepperOpen && (
        <>
          {isFormSubmitted ? (
            <SuccessApplication />
          ) : (
            <Steps>
              <Step1 />
              <Step2 />
              <Step3 />
              <Step4 />
              <Step5 />
            </Steps>
          )}
        </>
      )}
    </div>
  );
};

type StepperContextType = {
  step: number;
  changeStep: (value: number) => void;
  saveStep: (data: any) => void;
  steps: Record<string, any> | null;
  setIsFormSubmitted: (isSubmitted: boolean) => void;
  isFormSubmitted: boolean;
};
const StepperContext = createContext<StepperContextType | null>(null);
const StepperProvider = ({ children }: { children: JSX.Element }) => {
  const [step, setStep] = useState(0);
  const [steps, setSaveStep] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const changeStep = (value: number) => setStep(value);
  const saveStep = (data: any) =>
    setSaveStep((steps) => ({ ...(steps ?? {}), ...data }));
  const value = {
    step,
    changeStep,
    steps,
    saveStep,
    isFormSubmitted,
    setIsFormSubmitted,
  };

  return (
    <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
  );
};
const useStepper = () => {
  const ctx = useContext(StepperContext);

  if (ctx === null) {
    throw Error("Context has not been Provided!");
  }

  return ctx;
};

export function Steps({ children }: { children: JSX.Element[] }) {
  const { step, steps } = useStepper();

  return (
    <div className="modal-wrapper">
      <div className="relative form-section grid items-center">
        {children[step]}
      </div>
    </div>
  );
}

const FormControls = () => {
  const { step, steps, changeStep } = useStepper();

  const onPrev = (event: any) => {
    event.preventDefault();
    changeStep(step - 1);
  };

  const onNext = (event: any) => {
    event.preventDefault();
    changeStep(step + 1);
  };
  return (
    <div className="form-controls">
      <button
        disabled={step <= 0}
        className="btn primary absolute left-2 top-2 border-none"
        onClick={onPrev}
      >
        <ChevronLeftIcon className="h-6 w-6 text-primary-red" />
      </button>
    </div>
  );
};

export function Step1() {
  const { changeStep, step, saveStep, steps } = useStepper();
  const prevValue = steps?.[step]?.["web3exp"] as string;
  const {
    control,
    formState: { isDirty, isValid, errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      web3exp: prevValue ?? "",
    },
  });

  const submit = (data: any) => {
    if (isValid) {
      saveStep({ [step]: data });
      changeStep(step + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <div className="">
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-900 dark:text-white"
          >
            Tell us about your experience in WEB-3
          </label>
        </div>
        <Input
          controllerProps={{
            control,
            name: "web3exp",
            rules: {
              required: "This field is required",
            },
          }}
        />
        <div className="error-text absolute inset-x-0 ">
          {errors.web3exp && errors.web3exp.message}
        </div>
      </div>
      <div className="grid grid-flow-col justify-center gap-x-2">
        <button
          disabled={!isValid}
          type="submit"
          className="btn primary mt-16 "
        >
          Next
        </button>
      </div>
      <FormControls />
    </form>
  );
}
export function Step2() {
  const { changeStep, step, saveStep, steps } = useStepper();
  const prevValue = steps?.[step]?.["helpToFind"] as string;

  const {
    control,
    formState: { isDirty, isValid, errors },
    watch,
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      helpToFind: prevValue ?? "",
    },
  });

  const submit = (data: any) => {
    if (isValid) {
      saveStep({ [step]: data });
      changeStep(step + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <div className="">
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-900 dark:text-white"
          >
            Why do you want to help me find Obby?
          </label>
        </div>
        <Input
          controllerProps={{
            control,
            name: "helpToFind",
            rules: {
              required: "This field is required",
            },
          }}
        />
        <div className="error-text absolute inset-x-0 ">
          {errors.helpToFind && errors.helpToFind.message}
        </div>
      </div>
      <div className="grid grid-flow-col justify-center gap-x-2">
        <button
          disabled={!isValid}
          type="submit"
          className="btn primary mt-16 "
        >
          Next
        </button>
      </div>
      <FormControls />
    </form>
  );
}
export function Step3() {
  const { changeStep, step, saveStep, steps } = useStepper();
  const prevValue = steps?.[step]?.["twitter"] as string;
  const [shareTwitterLink, setShareTwitterLink] = useState<{
    shareTwitter: string;
  } | null>(null);

  useEffect(() => {
    fetch(
      "https://api.github.com/repos/obby-project/web-site-frontend/contents/config.json"
    )
      .then((res) => res.json())
      .then((data) => setShareTwitterLink(JSON.parse(atob(data.content))));
  }, []);

  return (
    <div>
      <div>
        <div className="">
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-900 dark:text-white"
          >
            Did you share Obby missing persons announcement?*
          </label>
          <a
            href={shareTwitterLink?.shareTwitter ?? ""}
            className="text-white bg-primary-blue inline-block px-2 py-1 twitter-share-button"
            data-show-count="false"
            target={"_blank"}
            rel="noreferrer"
          >
            Tweet
          </a>
          <script async src="https://platform.twitter.com/widgets.js"></script>
        </div>
      </div>
      <div className="grid grid-flow-col justify-center gap-x-2">
        <button
          type="submit"
          className="btn primary mt-16 "
          onClick={() => changeStep(step + 1)}
        >
          Next
        </button>
      </div>
      <FormControls />
    </div>
  );
}
export function Step4() {
  const { changeStep, step, saveStep, steps } = useStepper();
  const prevValue = steps?.[step]?.["twitterLink"] as string;

  const {
    control,
    setError,
    formState: { isDirty, isValid, errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      twitterLink: prevValue ?? "",
    },
  });

  const submit = (data: any) => {
    if (isValid) {
      saveStep({ [step]: data });

      changeStep(step + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <div className="">
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-900 dark:text-white"
          >
            What about your Twitter?*
          </label>
        </div>
        <Input
          controllerProps={{
            control,
            name: "twitterLink",
            rules: {
              required: "This field is required",
              validate: async (value) => {
                const res = await isValueExists("twitter", value);

                if (res?.code !== 200) {
                  setError("twitterLink", {
                    message: res.message,
                    type: "value",
                  });
                }
                return res?.code === 200;
              },
            },
          }}
        />
        <div className="error-text absolute inset-x-0 ">
          {errors.twitterLink && errors.twitterLink.message}
        </div>
      </div>
      <div className="grid grid-flow-col justify-center gap-x-2">
        <button
          disabled={!isValid}
          type="submit"
          className="btn primary mt-16 "
        >
          Next
        </button>
      </div>
      <FormControls />
    </form>
  );
}

export function Step5() {
  const { changeStep, step, steps, saveStep, setIsFormSubmitted } =
    useStepper();
  const prevValue = steps?.[step]?.["wallet"] as string;

  const {
    control,
    setError,
    formState: { isDirty, isValid, errors, isSubmitting, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      wallet: prevValue ?? "",
    },
  });

  const submit = async (data: any) => {
    if (isValid) {
      let preSendData = {} as any;
      for (const item of Object.values(steps ?? {})) {
        preSendData = Object.assign(preSendData, item);
      }

      preSendData["wallet"] = data["wallet"];

      await createUser(preSendData);
      setIsFormSubmitted(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <div className="">
          <label
            htmlFor="email"
            className="mb-2 block text-lg font-medium text-gray-900 dark:text-white"
          >
            Lastly, please share your wallet address.*
          </label>
          <div className="tip  text-white/80 text-sm mb-2">
            We&apos;ll need this to grant you access
          </div>
        </div>
        <Input
          readonly={isSubmitting}
          controllerProps={{
            control,
            name: "wallet",
            rules: {
              required: "This field is required",
              validate: async (value) => {
                const res = await isValueExists("wallet", value);

                if (res?.code !== 200) {
                  setError("wallet", {
                    message: res.message,
                    type: "value",
                  });
                }
                return res?.code === 200;
              },
            },
          }}
        />
        <div className="error-text absolute inset-x-0 ">
          {errors.wallet && errors.wallet.message}
        </div>
      </div>
      <Loader isLoading={isSubmitting}>
        <div className="grid grid-flow-col justify-center gap-x-2">
          <button
            disabled={!isValid || isSubmitting}
            type="submit"
            className="btn primary mt-16"
          >
            Apply
          </button>
          <FormControls />
        </div>
      </Loader>
    </form>
  );
}

function SuccessApplication() {
  return (
    <div className="modal-wrapper">
      <div className="text-center relative form-section grid items-center">
        <div>
          <div className="text-primary-green   lg:text-xl mb-2">
            Thanks for applying
          </div>
          <div className="text-primary-green mb-10   lg:text-xl">
            You&apos;ll hear from us soon
          </div>
          <Link
            className="py-3 px-5 bg-primary-blue text-white grid max-w-max mx-auto my-0 grid-flow-col gap-2 items-center"
            href={"https://twitter.com/Obby_NFT"}
            target="_blank"
          >
            Follow on Twitter
          </Link>
        </div>
      </div>
    </div>
  );
}

const Loader = ({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: JSX.Element;
}) => (isLoading ? <div className="loader">Loading...</div> : children);

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
};

function VideoComponent({
  src,
  onEnded,
  onSkip,
}: {
  src: string;
  onEnded: (event: any) => void;
  onSkip: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>();
  const previousUrl = useRef(src);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    if (previousUrl.current === src) {
      return;
    }

    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.autoplay = true;
    }

    previousUrl.current = url;
  }, [src]);

  useEffect(() => {
    audioRef.current = new Audio("/backgrounds/audio.mp3");
  }, []);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setToggle(audio.paused);
      return;
    }

    audio.pause();

    setToggle(audio.paused);
  };
  return (
    <div>
      <div className="right-5 bottom-5 absolute z-10 grid grid-flow-col gap-x-6 items-center">
        <div
          className="hover:cursor-pointer user-select-none text-primary-red"
          onClick={onSkip}
        >
          SKIP
        </div>
        <div
          className=" hover:cursor-pointer user-select-none"
          onClick={toggleSound}
        >
          {!toggle ? (
            <SpeakerWaveIcon className="h-7 w-7 text-primary-blue" />
          ) : (
            <SpeakerXMarkIcon className="h-7 w-7 text-primary-blue" />
          )}
        </div>
      </div>
      <video
        onEnded={onEnded}
        ref={videoRef}
        className="video"
        muted
        playsInline
        autoPlay
      >
        <source src={src} />
      </video>
    </div>
  );
}
