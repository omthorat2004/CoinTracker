
export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 4 : 2
    }).format(price);
  };
  
export  const formatPercentageChange = (value) => {
    if (value === null || value === undefined) return '-';
    return (
      <span style={{ color: value >= 0 ? '#16c784' : '#ea3943' }}>
        {value >= 0 ? '+' : ''}
        {value?.toFixed(2)}%
      </span>
    );
  };
  
export  const formatMarketCap = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2
    }).format(value);
  };
  
export  const formatVolume = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2
    }).format(value);
  };
  
export  const formatSupply = (value, symbol) => {
    return `${new Intl.NumberFormat('en-US').format(value)} ${symbol}`;
  };