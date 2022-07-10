#include<bits/stdc++.h>
using namespace std;

int main()
{
    int t;
    cin>>t;
    for(int i=0; i<t; i++){
      int n,m;
    cin>>n>>m;
    vector<int> v(n);
    for(int i=0; i<v.size(); i++){
        cin>>v[i];
    }
    sort(v.begin(), v.end());
    double res = 0;
    if(m > 1)
    {
        int add = m-1;
        for(int i=n-1; i >= n-1 - add + 1; i--)
            res += v[i];
    }
    double med = 0;
    int elements = n - m + 1;
    if(elements%2 == 1)
    {
        res += v[elements/2];
    }
    else
    {
        med += v[elements/2] + v[elements/2 - 1];
        res += (med)/(2.0);
    }
    cout<<fixed<<setprecision(6)<<res<<endl;
    }
    return 0;
}