import React, {useState} from 'react';

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
    if (pageNum < 3) {
      setPageNum(pageNum+1);
    }
  };

  if (pageNum === 1) {
    return (
      <div className = "tutorialpage">
        <MenuBar currPageNum={currPageNum} showPrev={showPrev} showNext={showNext} exitTutorial={exitTutorial} />
        <h1>Tutorial</h1>
        <h2>tuto1.jpg</h2>
      </div>
    );
  }
  else if (pageNum === 2) {
    return (
      <div className = "tutorialpage">
        <MenuBar currPageNum={currPageNum} showPrev={showPrev} showNext={showNext} exitTutorial={exitTutorial} />
        <h1>Tutorial</h1>
        <h2>tuto2.jpg</h2>
      </div>
    );
  }
  else {
    return (
      <div className = "tutorialpage">
        <MenuBar currPageNum={currPageNum} showPrev={showPrev} showNext={showNext} exitTutorial={exitTutorial} />
        <h1>Tutorial</h1>
        <h2>tuto3.jpg</h2>
      </div>
    );
  }
  
};

const MenuBar = ({currPageNum, showPrev, showNext, exitTutorial}) => {
  return (
    <div className='menubar flex-row'>
      <div className='flex-cell-1'><button className='rectangle-4-1 margin-1vh align-center' onClick={showPrev}>Previous</button></div>
      <div className='flex-cell-1'><button className='rectangle-10-1 margin-1vh align-center'>{currPageNum()}/3</button></div>
      <div className='flex-cell-1'><button className='rectangle-4-1 margin-1vh align-center' onClick={showNext}>Next</button></div>
      <div className='flex-cell-1'><button className='rectangle-4-1 margin-1vh align-center' onClick={exitTutorial}>Return to Main</button></div>
    </div>
  );
};

export default TutorialPage;