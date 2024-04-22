import { useState } from 'react';
import { Tooltip, Button } from '@mui/material';

const ZakatCalculator = () => {
  const [formData, setFormData] = useState({
    nisaabThreshold: 1473000,
    goldValue: 0,
    silverValue: 0,
    cashInHand: 0,
    otherAssets: 0,
    investments: 0,
    // Add more fields as needed
  });

  const [showFormula, setShowFormula] = useState(false);

  const toggleFormula = () => {
    setShowFormula(!showFormula);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value),
    });
  };

  const calculateNetWorth = () => {
    const {
      goldValue,
      silverValue,
      cashInHand,
      otherAssets,
      investments,
      nisaabThreshold,
    } = formData;

    const convertToNumber = (value) => (isNaN(value) ? 0 : parseFloat(value));

    const totalNetWorth =
      convertToNumber(goldValue) +
      convertToNumber(silverValue) +
      convertToNumber(cashInHand) +
      convertToNumber(otherAssets) +
      convertToNumber(investments);

    const payableZakat =
      totalNetWorth >= nisaabThreshold ? totalNetWorth * 0.025 : 0;
    return { totalNetWorth, payableZakat };
  };

  const clearFields = () => {
    setFormData({
      nisaabThreshold: 1473000,
      goldValue: 0,
      silverValue: 0,
      cashInHand: 0,
      otherAssets: 0,
      investments: 0,
    });
  };

  const { totalNetWorth, payableZakat } = calculateNetWorth();
  // const formula = `Payable Zakat = Total Net Worth × 2.5%`;

  return (
    <div className="flex justify-between">
      <div className="col-span-2">
        <Tooltip
          title={showFormula ? `Payable Zakat = Total Net Worth × 2.5%` : ''}
        >
          <Button
            variant="outlined"
            onClick={toggleFormula}
            sx={{
              color: '#67e8f9',
              '&:hover': {
                backgroundColor: '#67e8f9',
                color: 'black',
              },
            }}
          >
            See How Zakat is Calculated
          </Button>
        </Tooltip>
      </div>
      <div className="flex justify-center bg-cyan-300">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Zakat Calculator</h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block mb-2">
                Nisaab Threshold Value (Gold/Silver):
              </label>
              <input
                type="number"
                min={0}
                className="w-full border rounded p-2"
                name="nisaabThreshold"
                value={formData.nisaabThreshold}
                onChange={handleChange}
              />
              <p className="text-sm">
                Current Nisaab Rates: Gold = 1473000, Silver = 114713
              </p>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Value of Gold possessed:</label>
              <input
                type="number"
                min={0}
                className="w-full border rounded p-2"
                name="goldValue"
                value={formData.goldValue}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Value of Silver possessed:</label>
              <input
                type="number"
                min={0}
                className="w-full border rounded p-2"
                name="silverValue"
                value={formData.silverValue}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Cash in Hand / Bank:</label>
              <input
                type="number"
                min={0}
                className="w-full border rounded p-2"
                name="cashInHand"
                value={formData.cashInHand}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Other Assets / Savings:</label>
              <input
                type="number"
                min={0}
                className="w-full border rounded p-2"
                name="otherAssets"
                value={formData.otherAssets}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Investments:</label>
              <input
                type="number"
                min={0}
                className="w-full border rounded p-2"
                name="investments"
                value={formData.investments}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2 mt-4 flex justify-around">
              <div>
                <p className="font-bold">Total Net Worth:</p>
                <p>{totalNetWorth}</p>
              </div>
              <div>
                <p className="font-bold">Payable Zakat:</p>
                <p>{payableZakat.toFixed(2)}</p>
              </div>
            </div>
            <div className="col-span-2">
              <button
                className="bg-blue-500 text-white rounded p-2 w-full"
                onClick={() => clearFields()}
              >
                Clear Everything
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakatCalculator;
