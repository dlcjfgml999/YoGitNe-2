import time
from subprocess import check_call, call, run

def main():
	print('Wait for server run done.')
	print('Go to 5 seconds sleep...')
	time.sleep(5)
	print('It\'s time to test')
	command = 'python3 YoGitNeBackEnd/manage.py shell < tests/runtest.py'
	#check_call(["python3", "YoGitNeBackEnd/manage.py", "shell"])#, "< tests/runtest.py"])
	run(command, shell=True)
	#run(["python3", "YoGitNeBackEnd/manage.py", "shell", "< tests/runtest.py"])
	print('Test Done!')

if __name__ == '__main__':
	main()