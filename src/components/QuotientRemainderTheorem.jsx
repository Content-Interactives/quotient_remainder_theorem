import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Calculator, Lightbulb, BookOpen, RefreshCw, Check, X } from 'lucide-react';

const QuotientRemainderTheorem = () => {
  const [dividend, setDividend] = useState('');
  const [divisor, setDivisor] = useState('');
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userInputs, setUserInputs] = useState([]);
  const [inputStatus, setInputStatus] = useState([]);
  const [stepCompleted, setStepCompleted] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationComplete, setCalculationComplete] = useState(false);

  const handleCalculate = () => {
    const dividendNum = parseInt(dividend);
    const divisorNum = parseInt(divisor);
    
    if (isNaN(dividendNum) || isNaN(divisorNum) || divisorNum === 0) {
      setShowWarning(true);
      return;
    }

    setShowWarning(false);
    setIsCalculating(true);

    const quotient = Math.floor(dividendNum / divisorNum);
    const remainder = dividendNum % divisorNum;

    const steps = [
      { main: `Step 1: Calculate the integer quotient (floor division): ${dividendNum} ÷ ${divisorNum} = ?`, answer: quotient.toString() },
      { main: `Step 2: Calculate the remainder: ${dividendNum} - (${divisorNum} × ${quotient}) = ?`, answer: remainder.toString() },
      { main: `Step 3: Apply the theorem: (${divisorNum} × ${quotient}) + ${remainder} = ?`, answer: dividendNum.toString() },
    ];

    setSteps(steps);
    setCurrentStepIndex(0);
    setUserInputs(new Array(steps.length).fill(''));
    setInputStatus(new Array(steps.length).fill(null));
    setStepCompleted(new Array(steps.length).fill(false));
    setCalculationComplete(false);

    setIsCalculating(false);
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
    setShowWarning(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleCalculate();
    }
  };

  const generateRandomInputs = () => {
    const randomDividend = Math.floor(Math.random() * 1000) + 1;
    const randomDivisor = Math.floor(Math.random() * 100) + 1;
    setDividend(randomDividend.toString());
    setDivisor(randomDivisor.toString());
    setShowWarning(false);
  };

  const handleStepInputChange = (e, index) => {
    const newUserInputs = [...userInputs];
    newUserInputs[index] = e.target.value;
    setUserInputs(newUserInputs);
    
    const newInputStatus = [...inputStatus];
    newInputStatus[index] = null;
    setInputStatus(newInputStatus);
  };

  const checkStep = (index) => {
    const isCorrect = userInputs[index].trim() === steps[index].answer.trim();
    
    const newInputStatus = [...inputStatus];
    newInputStatus[index] = isCorrect ? 'correct' : 'incorrect';
    setInputStatus(newInputStatus);

    if (isCorrect) {
      const newStepCompleted = [...stepCompleted];
      newStepCompleted[index] = true;
      setStepCompleted(newStepCompleted);

      if (index < steps.length - 1) {
        setCurrentStepIndex(index + 1);
      } else {
        setCalculationComplete(true);
      }
    }
  };

  const skipStep = (index) => {
    const newUserInputs = [...userInputs];
    newUserInputs[index] = steps[index].answer;
    setUserInputs(newUserInputs);

    const newInputStatus = [...inputStatus];
    newInputStatus[index] = 'correct';
    setInputStatus(newInputStatus);

    const newStepCompleted = [...stepCompleted];
    newStepCompleted[index] = true;
    setStepCompleted(newStepCompleted);

    if (index < steps.length - 1) {
      setCurrentStepIndex(index + 1);
    } else {
      setCalculationComplete(true);
    }
  };

  const getInputClassName = (index) => {
    let baseClass = "w-full text-sm px-1 text-left";
    switch (inputStatus[index]) {
      case 'correct':
        return `${baseClass} border-green-500 focus:border-green-500`;
      case 'incorrect':
        return `${baseClass} border-red-500 focus:border-red-500`;
      default:
        return `${baseClass} border-gray-300 focus:border-blue-500`;
    }
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <Card className="w-full max-w-2xl mx-auto shadow-md bg-white">
        <CardHeader className="bg-sky-100 text-sky-800">
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold">Quotient Remainder Theorem</CardTitle>
            <Calculator size={40} className="text-sky-600" />
          </div>
          <CardDescription className="text-sky-700 text-lg">Learn and Apply the Quotient Remainder Theorem!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <Alert className="bg-blue-50 border-blue-100">
            <Lightbulb className="h-4 w-4 text-blue-400" />
            <AlertTitle className="text-blue-700">Quotient Remainder Theorem Basics</AlertTitle>
            <AlertDescription className="text-blue-600">
              <p className="mb-4">
                The Quotient Remainder Theorem helps us solve division problems and find remainders. It states that for any two positive integers (dividend and divisor), we can express their division as:
              </p>
              <p className="font-bold text-center mb-4">
                Dividend = (Divisor × Quotient) + Remainder
              </p>
              <p>Where the quotient is the result of integer division (largest whole number without remainder), and the remainder is what's left over.</p>
            </AlertDescription>
          </Alert>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 flex space-x-4">
                <Input
                  type="number"
                  value={dividend}
                  onChange={(e) => handleInputChange(e, setDividend)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter dividend"
                  className={`flex-1 text-lg border-sky-200 focus:border-sky-400 ${showWarning ? 'border-red-500' : ''}`}
                />
                <Input
                  type="number"
                  value={divisor}
                  onChange={(e) => handleInputChange(e, setDivisor)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter divisor (non-zero)"
                  className={`flex-1 text-lg border-sky-200 focus:border-sky-400 ${showWarning ? 'border-red-500' : ''}`}
                />
              </div>
              <Button onClick={generateRandomInputs} className="flex items-center bg-sky-500 hover:bg-sky-600 text-white h-10 whitespace-nowrap">
                <RefreshCw className="mr-2 h-4 w-4" />
                Random
              </Button>
            </div>
            {showWarning && (
              <p className="text-sm text-red-500">Please enter valid numbers (divisor cannot be zero).</p>
            )}
            <Button 
              onClick={handleCalculate} 
              className="w-full bg-emerald-400 hover:bg-emerald-500 text-white text-xl py-6"
              disabled={isCalculating}
            >
              {isCalculating ? 'Calculating...' : 'Apply Theorem'}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start bg-gray-50">
          {steps.length > 0 && (
            <div className="w-full">
              <p className="font-semibold text-purple-600 mb-2">Calculation Steps:</p>
              {steps.map((step, index) => (
                <div key={index} className={`bg-purple-50 p-2 rounded mb-2 ${index > currentStepIndex ? 'hidden' : ''}`}>
                  <p>{step.main}</p>
                  {stepCompleted[index] ? (
                    <p className="text-green-600">Answer: {step.answer}</p>
                  ) : (
                    index === currentStepIndex && (
                      <div className="flex items-center space-x-1 text-sm mt-2">
                        <Input
                          type="text"
                          value={userInputs[index]}
                          onChange={(e) => handleStepInputChange(e, index)}
                          placeholder="Enter your answer"
                          className={getInputClassName(index)}
                        />
                        <Button onClick={() => checkStep(index)} className="bg-blue-400 hover:bg-blue-500 px-2 py-1 text-xs whitespace-nowrap">
                          Check
                        </Button>
                        <Button onClick={() => skipStep(index)} className="bg-gray-400 hover:bg-gray-500 px-2 py-1 text-xs">
                          Skip
                        </Button>
                        {inputStatus[index] === 'correct' && <Check className="text-green-500 w-4 h-4" />}
                        {inputStatus[index] === 'incorrect' && <X className="text-red-500 w-4 h-4" />}
                      </div>
                    )
                  )}
                </div>
              ))}
              {calculationComplete && (
                <Alert className="mt-4 bg-emerald-50 border-emerald-200">
                  <AlertTitle className="text-emerald-700 text-xl">Calculation Complete!</AlertTitle>
                  <AlertDescription className="text-emerald-600 text-lg">
                    You've successfully applied the Quotient Remainder Theorem!
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardFooter>
      </Card>
      <div className="mt-4 text-center text-gray-700">
        <p className="flex items-center justify-center">
          <BookOpen className="mr-2 text-gray-600" />
          The Quotient Remainder Theorem is fundamental in number theory and has applications in everyday math problems!
        </p>
      </div>
    </div>
  );
};

export default QuotientRemainderTheorem;