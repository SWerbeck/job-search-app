const Colortest = () => {
  return (
    <div>
      <div className="bg-headline h-20 w-50 border-spacing-x-5 border border: mx-3 border-white">
        <h2 className="text-white text-4xl">HEADLINE</h2>
      </div>
      <div className="bg-mainbody h-80 w-50 border-spacing-x-7 border border: mx-3 border-white">
        <p className="text-white">
          words words more words words words wordy word words
        </p>
        <div className="flex-auto items-end">
          <button className="bg-button1 text-mainbody">button</button>
          <button className="bg-button4 text-mainbody">button</button>
          <button className="bg-button2 text-mainbody">button 2</button>
          <button className="bg-button3 text-mainbody">button 3</button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Colortest;
