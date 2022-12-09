import React, {useState} from 'react';
import "./all.css";

/*
A. Only shown for the first time after sign up.
B. Contains 3 or more pages of picture describing main functions.
C. ‘Skip’ button for who doesn’t really need the tutorial.
D. ‘Next’ (‘Finish’ for last page) button that allows to turn pages.
E. Provide interactions like sliding left or right to turn pages.
F. Example
*/

const TutorialPage = ({exitTutorial}) => {
  const [pageNum, setPageNum] = useState(1);

  const currPageNum = () => {
    return pageNum;
  };

  const showPrev = () => {
    if (pageNum > 1) {
      setPageNum(pageNum-1);
    }
  };

  const showNext = () => {
    if (pageNum < 11) {
      setPageNum(pageNum+1);
    }
  };

  switch (pageNum) {
    case 1:
      return (
        <div className = "tutorialpage">
          <MenuBar currPageNum={currPageNum} showPrev={showPrev} showNext={showNext} exitTutorial={exitTutorial} />
          <div id="tutorial-image1" />
        </div>
      );
    case 2:
      return (
        <div className = "tutorialpage">
          <MenuBar currPageNum={currPageNum} showPrev={showPrev} showNext={showNext} exitTutorial={exitTutorial} />
          <div id="tutorial-image2" />
        </div>
      );
    case 3:
      return (
        <div className = "tutorialpage">
          <MenuBar currPageNum={currPageNum} showPrev={showPrev} showNext={showNext} exitTutorial={exitTutorial} />
          <div id="tutorial-image3" />
        </div>
      );
    case 4:
      return (
        <div className = "tutorialpage">
          <MenuBar currPageNum={currPageNum} showPrev={showPrev} showNext={showNext} exitTutorial={exitTutorial} />
          <div id="tutorial-image4" />
        </div>
      );
    case 5:
      return (
        <div className = "tutorialpage">
          <MenuBar currPageNum={currPageNum} showPrev={showPrev} showNext={showNext} exitTutorial={exitTutorial} />
          <div id="tutorial-image5" />
        </div>
      );
    case 6:
      return (
        <div className = "tutorialpage">
          <MenuBar currPageNum={currPageNum} showPrev={showPrev} showNext={showNext} exitTutorial={exitTutorial} />
          <div id="tutorial-image6" />
        </div>
      );
    case 7:
      return (
        <div className = "tutorialpage">
          <MenuBar currPageNum={currPageNum} showPrev={showPrev} showNext={showNext} exitTutorial={exitTutorial} />
          <div id="tutorial-image7" />
        </div>
      );
    case 8:
      return (
        <div className = "tutorialpage">
          <MenuBar currPageNum={currPageNum} showPrev={showPrev} showNext={showNext} exitTutorial={exitTutorial} />
          <div id="tutorial-image8" />
        </div>
      );
    case 9:
      return (
        <div className = "tutorialpage">
          <MenuBar currPageNum={currPageNum} showPrev={showPrev} showNext={showNext} exitTutorial={exitTutorial} />
          <div id="tutorial-image9" />
        </div>
      );
    case 10:
      return (
        <div className = "tutorialpage">
          <MenuBar currPageNum={currPageNum} showPrev={showPrev} showNext={showNext} exitTutorial={exitTutorial} />
          <div id="tutorial-image10" />
        </div>
      );
    case 11:
      return (
        <div className = "tutorialpage">
          <MenuBar currPageNum={currPageNum} showPrev={showPrev} showNext={showNext} exitTutorial={exitTutorial} />
          <div id="tutorial-image11" />
        </div>
      );
    default:
      return (
        <div className = "tutorialpage">
        </div>
      );
  }
  
};

const MenuBar = ({currPageNum, showPrev, showNext, exitTutorial}) => {
  return (
    <div className='menubar flex-row'>
      <div className='flex-cell-1'><button className='rectangle-4-1 margin-1vh align-center' onClick={showPrev}>Previous</button></div>
      <div className='flex-cell-1'><button className='rectangle-10-1 margin-1vh align-center'>{currPageNum()}/11</button></div>
      <div className='flex-cell-1'><button className='rectangle-4-1 margin-1vh align-center' onClick={showNext}>Next</button></div>
      <div className='flex-cell-1'><button className='rectangle-4-1 margin-1vh align-center' onClick={exitTutorial}>Return to Main</button></div>
    </div>
  );
};

export default TutorialPage;