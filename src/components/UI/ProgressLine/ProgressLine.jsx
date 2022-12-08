import  scss  from './ProgressLine.module.scss';

const ProgressLine = ({
	customStyleName,
	customStyleFirst,
	customStyleSecond,
	customStyleThird,
	stepName
}) => (
	<div className={scss.progressContainer}>
	<div className={scss.stepNameWrap}>
		<p className={`${scss.stepName} ${customStyleName}`}>{stepName}</p>
	</div>
	<div className={`${scss.progressLine} ${customStyleThird}`}>
		<div className={`${scss.progressLineColor} ${customStyleFirst}`}></div>
		<div className={`${scss.progressLineColor} ${customStyleSecond}`}></div>
		<div className={`${scss.progressLineColor}`}></div>
	</div>
</div>
);

export default ProgressLine;

